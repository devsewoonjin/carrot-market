"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX_ERROR,
  PASSWORD_REGX,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";
const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

// const checkPassword;
const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exists."),
  password: z.string({ required_error: "Password is required" }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGX, PASSWORD_REGEX_ERROR),
});
export const login = async (prevState: any, formData: FormData) => {
  console.log({ prevState: prevState, formData: formData });

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    console.log(result.data);

    //유저를 찾고, 해쉬된 비밀번호 확인
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    const ok = await bcrypt.compare(
      result.data.password,
      user!.password ?? "xxxx"
    );
    console.log(ok);

    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      await session.save();
      redirect("/profile");
    } else {
      return { fieldErrors: { email: [], password: ["Wrong password."] } };
    }
  }
};
