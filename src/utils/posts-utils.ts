/**
 * Blog post utility functions - Optimized version
 * Main utility file for post-specific functionality
 */

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  slug: string;
  author: string;
  description: string;
  tags: string[];
  image: string;
}

/**
 * Parse frontmatter from markdown content
 * Shared utility used by both posts and more pages
 */
export const parseFrontmatter = (
  content: string,
): {
  frontmatter: Record<string, string | string[]>;
  content: string;
} => {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(content);

  if (!match) return { frontmatter: {}, content };

  const [, frontmatterString, mainContent] = match;
  const frontmatter: Record<string, string | string[]> = {};

  frontmatterString.split('\n').forEach((line) => {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) return;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Handle tags array
    frontmatter[key] =
      key === 'tags' && value
        ? value.split(',').map((tag) => tag.trim())
        : value;
  });

  return { frontmatter, content: mainContent };
};

/**
 * Convert frontmatter value to string with fallback
 */
const frontmatterToString = (
  value: string | string[] | undefined,
  fallback = '',
): string =>
  Array.isArray(value) ? value.join(' ').trim() : value?.trim() || fallback;

/**
 * Process image URL with validation and fallback
 */
const processImageUrl = (imageValue: string | string[] | undefined): string => {
  let imageUrl = frontmatterToString(
    imageValue,
    '/assets/Images/SugarNewsLogo.png',
  );

  if (
    imageUrl !== '/assets/Images/SugarNewsLogo.png' &&
    !/^https?:\/\//.test(imageUrl)
  ) {
    imageUrl = '/' + imageUrl.replace(/^\/+/, '');
  }

  return imageUrl;
};

/**
 * Fetch and parse all markdown blog posts
 * Optimized with better error handling and sorting
 */
export const fetchMarkdownPosts = async (
  category?: string,
): Promise<Post[]> => {
  try {
    const markdownFiles = import.meta.glob(
      '@/constants/MarkdownFiles/posts/*.md',
      {
        query: '?raw',
        import: 'default',
      },
    );

    const allPosts: Post[] = [];

    for (const [filePath, importFn] of Object.entries(markdownFiles)) {
      try {
        const fileContent = await importFn();
        const { frontmatter, content } = parseFrontmatter(
          fileContent as string,
        );
        const fileName = filePath.split('/').pop()?.replace('.md', '') || '';

        const post: Post = {
          id: fileName,
          title: frontmatterToString(frontmatter.title, 'Untitled'),
          excerpt: frontmatterToString(frontmatter.excerpt),
          content,
          category: frontmatterToString(frontmatter.category, 'UNCATEGORIZED'),
          date: frontmatterToString(frontmatter.date, 'No date'),
          slug: frontmatterToString(frontmatter.slug, fileName),
          author: frontmatterToString(frontmatter.author, 'Sugar Labs'),
          description: frontmatterToString(
            frontmatter.description,
            'Writer and contributor at Sugar Labs',
          ),
          tags: Array.isArray(frontmatter.tags)
            ? frontmatter.tags
            : frontmatter.tags
              ? [frontmatter.tags]
              : [],
          image: processImageUrl(frontmatter.image),
        };

        allPosts.push(post);
      } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
      }
    }

    // Sort by date (newest first) with better date handling
    const sortedPosts = allPosts.sort((a, b) => {
      const dateA = new Date(a.date).getTime() || 0;
      const dateB = new Date(b.date).getTime() || 0;
      return dateB - dateA;
    });

    return category
      ? sortedPosts.filter((post) => post.category === category)
      : sortedPosts;
  } catch (error) {
    console.error('Error fetching markdown posts:', error);
    return [];
  }
};

/**
 * Get a single post by its slug
 */
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  const allPosts = await fetchMarkdownPosts();
  return allPosts.find((post) => post.slug === slug) || null;
};

/**
 * Get all posts (alias for fetchMarkdownPosts with no category filter)
 */
export const getAllPosts = async (): Promise<Post[]> => fetchMarkdownPosts();

/**
 * Group posts by category with 'All' category included
 */
export const groupPostsByCategory = (posts: Post[]): Record<string, Post[]> => {
  const categoryMap: Record<string, Post[]> = { All: posts };

  posts.forEach((post) => {
    const category = post.category || 'UNCATEGORIZED';
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push(post);
  });

  return categoryMap;
};
