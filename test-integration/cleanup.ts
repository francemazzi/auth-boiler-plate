import { prisma } from './prisma';

type EntityType = 'user' | 'license' | 'otpSecret';

export class IntegrationCleanup {
  private createdIds: Record<EntityType, Set<string>> = {
    user: new Set<string>(),
    license: new Set<string>(),
    otpSecret: new Set<string>(),
  };

  public track(entity: EntityType, id: string): void {
    this.createdIds[entity].add(id);
  }

  public async run(): Promise<void> {
    // Delete dependent entities first to satisfy FK constraints
    for (const id of this.createdIds.otpSecret) {
      await prisma.oTPSecret.delete({ where: { id } }).catch(() => undefined);
    }
    for (const id of this.createdIds.license) {
      await prisma.license.delete({ where: { id } }).catch(() => undefined);
    }
    for (const id of this.createdIds.user) {
      await prisma.user.delete({ where: { id } }).catch(() => undefined);
    }

    // Reset tracking for next test
    this.createdIds.user.clear();
    this.createdIds.license.clear();
    this.createdIds.otpSecret.clear();
  }
}

export const integrationCleanup = new IntegrationCleanup();
