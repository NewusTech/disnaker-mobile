import { z } from "zod";

export const postLoginPayloadSchema = z.object({
  email: z.string({ message: "Harus diisi" }).email("Email tidak valid"),
  password: z.string({ message: "Harus diisi" }),
});
export type PostLoginPayload = z.infer<typeof postLoginPayloadSchema>;
export type PostLoginResponseSuccess = {
  data: {
    created_at: string;
    deleted_at?: string;
    email: string;
    nik: string;
    id: number;
    master_cabang_id: number;
    nama: string;
    alamat?: string;
    no_telp?: string;
    role_id: number;
    token: string;
    type: "bearer";
    updated_at: string;
    image_url: string;
    kota: string;
  };
};