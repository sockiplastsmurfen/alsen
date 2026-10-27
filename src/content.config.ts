import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const link = z.object({ label: z.string(), url: z.string().url() });

const profiles = defineCollection({
  loader: glob({ pattern: '*/profile.yml', base: './content' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      title: z.string(),
      location: z.string().optional(),
      email: z.string().email().optional(),
      summary: z.string(),
      avatar: image().optional(),
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#D4A574'),
      stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      earlier: z.array(z.object({ title: z.string(), meta: z.string().optional() })).default([]),
      links: z.array(link).default([]),
      skills: z.array(z.object({ name: z.string(), items: z.array(z.string()) })).default([]),
      speaking: z.array(z.object({ title: z.string(), event: z.string(), year: z.number(), url: z.string().url().optional() })).default([]),
      projects: z.array(z.object({ name: z.string(), description: z.string(), url: z.string().url().optional() })).default([]),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '*/experience/*.md', base: './content' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      company: z.string(),
      link: z.string().url().optional(),
      location: z.string().optional(),
      start: z.coerce.date(),
      stop: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      image: image().optional(),
    }),
});

const education = defineCollection({
  loader: glob({ pattern: '*/education/*.md', base: './content' }),
  schema: z.object({
    title: z.string(),
    school: z.string(),
    start: z.coerce.date(),
    stop: z.coerce.date().optional(),
  }),
});

export const collections = { profiles, experience, education };
