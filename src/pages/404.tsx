import Error from 'next/error';
import { SEO } from '@components/common/seo';

export default function NotFound(): JSX.Element {
  return (
    <>
      <SEO
        title='Page not found'
        description='The page you are looking for is not found.'
      />
      <Error statusCode={404} />
    </>
  );
}
