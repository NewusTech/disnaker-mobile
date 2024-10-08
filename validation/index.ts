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
  birthDate: z.string({ message: "Harus diisi" }),
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
});

export type profileForm = z.infer<typeof profile>;

export const userLink = z.object({
  link: z.string({ message: "Harus diisi" }),
  linkType: z.string({ message: "Harus diisi" }),
});

export type userLinkForm = z.infer<typeof userLink>;
