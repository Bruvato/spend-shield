import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle, Zap, Users, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-8 w-8 text-primary" />,
    title: "Task Management",
    description: "Organize and prioritize tasks with ease.",
  },
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: "Real-time Collaboration",
    description: "Work together seamlessly in real-time.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Team Communication",
    description: "Stay connected with built-in messaging.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Analytics Dashboard",
    description: "Track progress and gain insights with powerful analytics.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card className="p-6">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
