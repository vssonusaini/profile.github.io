import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About ToolMaster</h1>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-lg mb-6">
            ToolMaster was founded in 2023 with a simple mission: to simplify complex workflows and boost productivity for teams of all sizes. Our suite of intuitive tools is designed to streamline your work processes, allowing you to focus on what truly matters - creating exceptional results.
          </p>
          <p className="text-lg mb-6">
            With a team of passionate developers, designers, and productivity experts, we're constantly innovating to bring you the best possible solutions. Our commitment to user-centric design and cutting-edge technology has made us a trusted partner for thousands of businesses worldwide.
          </p>
          <Button size="lg">Join Our Journey</Button>
        </div>
        <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
          [Placeholder for Company Image]
        </div>
      </div>
    </div>
  )
}

