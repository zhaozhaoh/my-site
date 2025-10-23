import { z } from "zod";

export const ContactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email"),
  message: z.string().min(5, "Message is too short").max(2000),
  // honeypot：人类应当留空
  hp: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof ContactSchema>;
