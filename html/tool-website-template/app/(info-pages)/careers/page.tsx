import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

const openPositions = [
  { title: "Senior Frontend Developer", department: "Engineering", location: "Remote" },
  { title: "UX Designer", department: "Design", location: "New York, NY" },
  { title: "Product Manager", department: "Product", location: "San Francisco, CA" },
  { title: "DevOps Engineer", department: "Operations", location: "Remote" },
]

export default function CareersPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Join Our Team</h1>
      <p className="text-xl mb-12">
        At ToolMaster, we're always looking for talented individuals who are passionate about creating innovative solutions. Join us in our mission to simplify workflows and boost productivity for teams around the world.
      </p>
      <h2 className="text-2xl font-semibold mb-6">Open Positions</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {openPositions.map((position, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{position.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Department: {position.department}</p>
              <p className="text-muted-foreground mb-4">Location: {position.location}</p>
              <Button variant="outline">Apply Now</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="bg-muted p-8 rounded-lg text-center">
        <h3 className="text-2xl font-semibold mb-4">Don't see a position that fits?</h3>
        <p className="mb-6">We're always on the lookout for exceptional talent. Send us your resume, and we'll keep you in mind for future opportunities.</p>
        <Button size="lg">Submit Your Resume</Button>
      </div>
    </div>
  )
}

