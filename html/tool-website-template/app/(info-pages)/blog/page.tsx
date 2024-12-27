import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const blogPosts = [
  {
    title: "10 Tips to Boost Your Productivity",
    excerpt: "Discover simple yet effective ways to enhance your daily productivity and achieve more in less time.",
    date: "June 15, 2023",
    author: "Jane Doe",
    slug: "10-tips-to-boost-productivity"
  },
  {
    title: "The Future of Remote Work Tools",
    excerpt: "Explore the latest trends and upcoming technologies shaping the future of remote work collaboration.",
    date: "June 10, 2023",
    author: "John Smith",
    slug: "future-of-remote-work-tools"
  },
  {
    title: "How AI is Revolutionizing Task Management",
    excerpt: "Learn about the transformative impact of artificial intelligence on modern task management systems.",
    date: "June 5, 2023",
    author: "Alice Johnson",
    slug: "ai-revolutionizing-task-management"
  },
  {
    title: "Building a Culture of Productivity in Your Team",
    excerpt: "Discover strategies to foster a productivity-focused culture within your organization for better results.",
    date: "May 30, 2023",
    author: "Bob Williams",
    slug: "building-productivity-culture"
  }
]

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">ToolMaster Blog</h1>
      <p className="text-xl mb-12">Stay up to date with the latest productivity tips, industry trends, and ToolMaster news.</p>
      <div className="grid md:grid-cols-2 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  {post.date} | By {post.author}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="outline">Read More</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

