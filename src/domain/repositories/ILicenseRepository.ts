import { License } from "../entities/License";

export interface ILicenseRepository {
  create(license: License): Promise<License>;
  findById(id: string): Promise<License | null>;
  findByUserId(userId: string): Promise<License[]>;
  update(id: string, license: Partial<License>): Promise<License>;
  delete(id: string): Promise<void>;
}
