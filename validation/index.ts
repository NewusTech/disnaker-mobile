import { z } from "zod";

export const postLoginPayloadSchema = z.object({
  email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
  password: z.string({ message: "Harus diisi" }),
});
export type PostLoginPayload = z.infer<typeof postLoginPayloadSchema>;

export const postRegisterPayloadSchema = z.object({
  email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
  name: z.string({ message: "Harus diisi" }),
  password: z.string({ message: "Harus diisi" }),
});

export type PostRegisterPayload = z.infer<typeof postRegisterPayloadSchema>;
export type PostRegisterResponseError = {
  error: string;
};

export const profile = z.object({
  name: z.string({ message: "Harus diisi" }),
  nik: z
    .string({ message: "Harus diisi" })
    .min(16, { message: "NIK terdiri dari 16 karakter" }),
  email: z.string({ message: "Harus diisi" }),
  birthDate: z.date(),
  birthPlace: z.string({ message: "Harus diisi" }),
  gender: z.string({ message: "Harus diisi" }),
  phoneNumber: z
    .string({ message: "Harus diisi" })
    .max(13, { message: "maximal 13 karakter" }),
  department: z.string({ message: "Harus diisi" }),
  address: z.string({ message: "Harus diisi" }),
  religion: z.string({ message: "Harus diisi" }),
  profession: z.string({ message: "Harus diisi" }),
  employmentStatus: z.string({ message: "Harus diisi" }),
  maritalStatus: z.string({ message: "Harus diisi" }),
  citizenship: z.string({ message: "Harus diisi" }),
  provinsi: z.string({ message: "Harus diisi" }),
  kabupaten: z.string({ message: "Harus diisi" }),
  kecamatan: z.string({ message: "Harus diisi" }),
  kelurahan: z.string({ message: "Harus diisi" }),
});

export type profileForm = z.infer<typeof profile>;

export const userLink = z.object({
  link: z.string({ message: "Harus diisi" }),
  linkType: z.string({ message: "Harus diisi" }),
});

export type userLinkForm = z.infer<typeof userLink>;

export const userAbout = z.object({
  about: z.string({ message: "Harus diisi" }),
});

export type userAboutForm = z.infer<typeof userAbout>;

export const userEducation = z.object({
  educationLevel_id: z.string({ message: "Harus diisi" }),
  instanceName: z.string({ message: "Harus diisi" }),
  department: z.string({ message: "Harus diisi" }),
  gpa: z.string({ message: "Harus diisi" }),
  joinDate: z.date(),
  graduationDate: z.date(),
  desc: z.string({ message: "Harus diisi" }),
  isCurrently: z.boolean().optional(),
});

export type userEducationForm = z.infer<typeof userEducation>;

export const userOrganization = z.object({
  position: z.string({ message: "Harus diisi" }),
  organizationName: z.string({ message: "Harus diisi" }),
  joinDate: z.date(),
  leaveDate: z.date(),
  isCurrently: z.boolean().optional(),
  desc: z.string({ message: "Harus diisi" }).optional(),
});

export type userOrganizationForm = z.infer<typeof userOrganization>;

export const userExperience = z.object({
  title: z.string({ message: "Harus diisi" }),
  possition: z.string({ message: "Harus diisi" }),
  companyName: z.string({ message: "Harus diisi" }),
  contractType: z.string({ message: "Harus diisi" }),
  joinDate: z.date(),
  leaveDate: z.date(),
  isCurrently: z.boolean().optional(),
  desc: z.string({ message: "Harus diisi" }).optional(),
});

export type userExperienceForm = z.infer<typeof userExperience>;

export const userSertificate = z.object({
  title: z.string({ message: "Harus diisi" }),
  organization: z.string({ message: "Harus diisi" }),
  expiredDate: z.date(),
  isNonExpire: z.boolean(),
  desc: z.string({ message: "Harus diisi" }),
});

export type userSertificateForm = z.infer<typeof userSertificate>;

export const userComplaint = z.object({
  title: z.string({ message: "Harus diisi" }),
  desc: z.string({ message: "Harus diisi" }),
});

export type userComplaintForm = z.infer<typeof userComplaint>;

export const userRegisterYellowCard = z.object({
  residance: z.string({ message: "Harus diisi" }),
  provinsi: z.string({ message: "Harus diisi" }),
  kabupaten: z.string({ message: "Harus diisi" }),
  kecamatan: z.string({ message: "Harus diisi" }),
  kelurahan: z.string({ message: "Harus diisi" }),
  educationLevel_id: z.number({ message: "Harus diisi" }),
  job: z.string({ message: "Harus diisi" }),
  skill: z.string({ message: "Harus diisi" }),
});

export type userRegisterYellowCardForm = z.infer<typeof userRegisterYellowCard>;

export const userTransmigration = z.object({
  domicile: z.string({ message: "Harus diisi" }),
  provinsi: z.string({ message: "Harus diisi" }),
  kabupaten: z.string({ message: "Harus diisi" }),
  kecamatan: z.string({ message: "Harus diisi" }),
  kelurahan: z.string({ message: "Harus diisi" }),
  kk: z.string({ message: "Harus diisi" }).optional(),
});

export type userTransmigrationForm = z.infer<typeof userTransmigration>;
