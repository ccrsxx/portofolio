'use client';

import { Accent } from '@components/ui/accent';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { frontendEnv } from '@lib/env-frontend';
import { Turnstile } from '@marsidev/react-turnstile';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';

const createContactSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .pipe(z.email({ message: 'Invalid email address' })),
  message: z.string().min(1, { message: 'Message is required' })
});

type CreateContactSchema = z.infer<typeof createContactSchema>;

type CloudflareTurnstileStatus = 'error' | 'expired' | 'solved';

export default function ContactClient(): React.JSX.Element {
  const [cloudflareTurnstileStatus, setCloudflareTurnstileStatus] =
    useState<CloudflareTurnstileStatus | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateContactSchema>({
    resolver: zodResolver(createContactSchema)
  });

  const onSubmit = (data: CreateContactSchema): void => {
    alert(JSON.stringify(data, null, 2));
  };

  const isSubmitDisabled = cloudflareTurnstileStatus !== 'solved';

  return (
    <main className='min-h-screen grid content-start gap-6'>
      <header className='grid gap-2'>
        <h1 className='text-5xl font-bold animate-enter-y'>
          <Accent>Contact</Accent>
        </h1>
        <p className='text-secondary animate-enter-y animate-enter-delay-100'>
          Contact me directly on my website. I&apos;ll get back to you as soon
          as possible. Make sure to include valid email address, so I can reply
          back to you.
        </p>
      </header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <section className='grid gap-4'>
          <div className='flex flex-col md:flex-row gap-4 animate-enter-y animate-enter-delay-200 items-start'>
            <Input
              id='name'
              type='text'
              label='Name'
              error={errors.name}
              placeholder='Your name'
              containerClassName='w-full'
              register={register('name')}
            />
            <Input
              id='email'
              type='email'
              label='Email'
              error={errors.email}
              placeholder='Your email'
              containerClassName='w-full'
              register={register('email')}
            />
          </div>
          <Input
            id='message'
            type='textarea'
            label='Message'
            error={errors.message}
            placeholder='Your message'
            containerClassName='animate-enter-y animate-enter-delay-300'
            register={register('message')}
          />
          <div
            className='flex flex-col md:flex-row gap-4 justify-end md:items-start items-end 
                          animate-enter-y animate-enter-delay-400'
          >
            <Turnstile
              siteKey={frontendEnv.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
              onError={() => setCloudflareTurnstileStatus('error')}
              onExpire={() => setCloudflareTurnstileStatus('expired')}
              onSuccess={() => setCloudflareTurnstileStatus('solved')}
            />
            <Button
              type='submit'
              disabled={isSubmitDisabled}
              className='custom-button enabled:clickable disabled:text-foreground/60 disabled:main-border'
            >
              Send Message
            </Button>
          </div>
        </section>
      </form>
    </main>
  );
}
