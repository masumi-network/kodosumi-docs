import { source } from '@/lib/source';
import {
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { CustomDocsPage } from '@/components/custom-docs-page';
import { notFound, redirect } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  
  // Redirect root path to guides
  if (!params.slug || params.slug.length === 0) {
    redirect('/guides');
  } 
  
  let page = source.getPage(params.slug || []);
  
  // If no page found and slug exists, try adding 'index' to the slug
  if (!page && params.slug && params.slug.length > 0) {
    page = source.getPage([...params.slug, 'index']);
  }
  
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
    <CustomDocsPage toc={page.data.toc} full={page.data.full}>
      {page.data.banner && (
        <div className=" flex justify-center">
          <img 
            src={page.data.banner} 
            alt="Page banner"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      )}
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent
          components={getMDXComponents({
            // this allows you to link to other pages with relative file paths
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
     
    </CustomDocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  
  // For root path, return default metadata before redirect
  if (!params.slug || params.slug.length === 0) {
    return {
      title: 'Kodosumi Documentation',
      description: 'Runtime environment for managing and executing agentic services at scale',
    };
  }
  
  let page = source.getPage(params.slug || []);
  
  // If no page found and slug exists, try adding 'index' to the slug
  if (!page && params.slug && params.slug.length > 0) {
    page = source.getPage([...params.slug, 'index']);
  }
  
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
