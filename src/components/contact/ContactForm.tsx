import { useState } from 'react';
import { User, Mail, MessageSquare } from 'lucide-react';
import * as z from 'zod';

const formSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.email({ message: 'Please enter a valid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');

  const validate = () => {
    try {
      formSchema.parse(formData);
      setErrors({});
      return true;
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: { name?: string; email?: string; message?: string } =
          {};
        err.issues.forEach((issue) => {
          if (issue.path[0] === 'name') fieldErrors.name = issue.message;
          if (issue.path[0] === 'email') fieldErrors.email = issue.message;
          if (issue.path[0] === 'message') fieldErrors.message = issue.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsLoading(true);
    setStatus('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus('Message sent!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message.');
      }
    } catch (err) {
      console.error(err);
      setStatus('Failed to send message.');
    }

    setIsLoading(false);
  };

  return (
    <section className='w-full p-12'>
      <h2 className='mb-8 text-center text-4xl font-bold'>
        Heb je toch nog een vraag?
      </h2>
      <form
        onSubmit={handleSubmit}
        className='mx-auto flex max-w-[700px] flex-col gap-4 rounded-lg bg-white p-8 shadow-md dark:bg-gray-800'
      >
        {/* Name */}
        <div className='relative flex flex-col'>
          <label htmlFor='name' className='sr-only'>
            Name
          </label>
          <div className='relative'>
            <User
              className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300'
              size={20}
            />
            <input
              type='text'
              id='name'
              placeholder='Your Name'
              className={`w-full rounded-full border py-3 pr-4 pl-10 ${
                errors.name
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-gray-100 text-gray-900 focus:ring-2 focus:ring-lime-400 focus:outline-none dark:bg-gray-700 dark:text-gray-100`}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
          {errors.name && (
            <p className='mt-1 text-sm text-red-500'>{errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className='relative flex flex-col'>
          <label htmlFor='email' className='sr-only'>
            Email
          </label>
          <div className='relative'>
            <Mail
              className='absolute top-1/2 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300'
              size={20}
            />
            <input
              type='email'
              id='email'
              placeholder='Your Email'
              className={`w-full rounded-full border py-3 pr-4 pl-10 ${
                errors.email
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-gray-100 text-gray-900 focus:ring-2 focus:ring-lime-400 focus:outline-none dark:bg-gray-700 dark:text-gray-100`}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          {errors.email && (
            <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
          )}
        </div>

        {/* Message */}
        <div className='relative flex flex-col'>
          <label htmlFor='message' className='sr-only'>
            Message
          </label>
          <div className='relative'>
            <MessageSquare
              className='absolute top-6.5 left-3 -translate-y-1/2 text-gray-400 dark:text-gray-300'
              size={20}
            />
            <textarea
              id='message'
              placeholder='Your Message'
              rows={5}
              className={`w-full rounded-xl border py-3 pr-4 pl-10 ${
                errors.message
                  ? 'border-red-500'
                  : 'border-gray-300 dark:border-gray-600'
              } bg-gray-100 text-gray-900 focus:ring-2 focus:ring-lime-400 focus:outline-none dark:bg-gray-700 dark:text-gray-100`}
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>
          {errors.message && (
            <p className='mt-1 text-sm text-red-500'>{errors.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type='submit'
          disabled={isLoading}
          className={`mt-2 cursor-pointer rounded-full bg-lime-500 px-4 py-3 text-white transition-colors hover:bg-lime-600 dark:bg-lime-600 dark:hover:bg-lime-500 ${
            isLoading ? 'cursor-not-allowed opacity-50' : ''
          }`}
        >
          {isLoading ? 'Sending...' : 'Send Message'}
        </button>

        {status && <p className='mt-2 text-center text-sm'>{status}</p>}
      </form>
    </section>
  );
}
