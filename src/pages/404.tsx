import Error from 'next/error';
import { SEO } from '@components/common/seo';

export default function NotFound(): JSX.Element {
  return (
    <>
      <SEO title='Page not found' />
      <Error statusCode={404} />
    </>
  );
}
