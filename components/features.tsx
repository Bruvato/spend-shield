import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CheckCircle,
  Zap,
  Users,
  TrendingUp,
  Gamepad2,
  Trophy,
  ChartColumnIncreasing,
  Target,
  CreditCard,
  Gift,
  TriangleAlert,
} from "lucide-react";

const features = [
  {
    icon: <Gamepad2 className="h-8 w-8 text-primary" />,
    title: "Gamified Budgeting",
    description:
      "Earn XP and gold for responsible spending while tracking your budget like an RPG adventure.",
  },
  {
    icon: <Trophy className="h-8 w-8 text-primary" />,
    title: "Friendly Competition",
    description:
      "Challenge friends to budgeting battles and compete on leaderboards to build better spending habits.",
  },
  {
    icon: <ChartColumnIncreasing className="h-8 w-8 text-primary" />,
    title: "Spending Insights",
    description:
      "Get AI-powered breakdowns of your spending with personalized savings recommendations.",
  },
  {
    icon: <Target className="h-8 w-8 text-primary" />,
    title: "Quest Challenges",
    description:
      "Complete daily and group savings challenges to stay on track and earn rewards.",
  },
  {
    icon: <CreditCard className="h-8 w-8 text-primary" />,
    title: "Bank & Card Integration",
    description:
      "Sync transactions automatically using the Capital One Nessie API or Plaid for real-time tracking.",
  },
  {
    icon: <Gift className="h-8 w-8 text-primary" />,
    title: "Rewards & Marketplace",
    description:
      "Redeem in-game gold for real-world discounts, cashback, and avatar customizations.",
  },
  {
    icon: <TriangleAlert className="h-8 w-8 text-primary" />,
    title: "Spending Alerts",
    description:
      "Receive real-time notifications when you're nearing your budget limits.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Progress Tracking",
    description:
      "Visualize spending trends with intuitive charts and reports to stay motivated.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6">
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
