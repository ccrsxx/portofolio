'use client';

import { Accent } from '@components/ui/accent';
import { Alert } from '@components/ui/alert';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { frontendEnv } from '@lib/env-frontend';
import { fetcher } from '@lib/fetcher';
import type { CloudflareTurnstileStatus } from '@lib/types/cloudflare';
import { Turnstile, type TurnstileInstance } from '@marsidev/react-turnstile';
import { useRef, useState } from 'react';
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

type FeedbackState = {
  type: 'success' | 'error' | null;
  message: string;
};

export default function ContactClient(): React.JSX.Element {
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState>({
    type: null,
    message: ''
  });

  const [cloudflareTurnstileStatus, setCloudflareTurnstileStatus] =
    useState<CloudflareTurnstileStatus | null>(null);

  const turnstileRef = useRef<TurnstileInstance>(null);

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateContactSchema>({
    resolver: zodResolver(createContactSchema)
  });

  const onSubmit = async (data: CreateContactSchema): Promise<void> => {
    if (!turnstileRef.current) return;

    setLoading(true);
    setFeedback({ type: null, message: '' });

    const token = turnstileRef.current.getResponse();

    const dataWithToken = {
      ...data,
      token: token
    };

    try {
      await fetcher(`${frontendEnv.NEXT_PUBLIC_BACKEND_URL}/contacts`, {
        method: 'POST',
        body: JSON.stringify(dataWithToken),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${frontendEnv.NEXT_PUBLIC_OWNER_BEARER_TOKEN}`
        }
      });

      setFeedback({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      reset();
    } catch (err) {
      console.error('contact form submit error', err);

      setFeedback({
        type: 'error',
        message: 'An unexpected error occurred. Please try again later.'
      });
    } finally {
      setLoading(false);
      turnstileRef.current.reset();
    }
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
          as possible. Make sure to include a valid email address, so I can
          reply back to you.
        </p>
      </header>
      <form onSubmit={(e) => handleSubmit(onSubmit)(e)}>
        <section className='grid gap-4'>
          {feedback.type && (
            <Alert message={feedback.message} variant={feedback.type} />
          )}
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
              type='text'
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
              ref={turnstileRef}
              siteKey={frontendEnv.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY}
              onError={() => setCloudflareTurnstileStatus('error')}
              onExpire={() => setCloudflareTurnstileStatus('expired')}
              onSuccess={() => setCloudflareTurnstileStatus('solved')}
            />
            <Button
              type='submit'
              loading={loading}
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
