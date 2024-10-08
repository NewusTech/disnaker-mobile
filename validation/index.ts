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
  isCurrently: z.boolean(),
});

export type userEducationForm = z.infer<typeof userEducation>;

export const userOrganization = z.object({
  position: z.string({ message: "Harus diisi" }),
  organizationName: z.string({ message: "Harus diisi" }),
  joinDate: z.date(),
  leaveDate: z.date(),
  isCurrently: z.boolean(),
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
  isCurrently: z.boolean(),
  desc: z.string({ message: "Harus diisi" }).optional(),
});

export type userExperienceForm = z.infer<typeof userExperience>;

