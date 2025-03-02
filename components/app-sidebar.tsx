"use client";

import * as React from "react";
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Home,
  LineChart,
  PiggyBank,
  Settings2,
  ShoppingBag,
  Target,
  Wallet,
  Calendar,
  Users,
  Bell,
  TrendingDown
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/avatars/user.jpg",
  },
  teams: [
    {
      name: "Personal",
      logo: Wallet,
      plan: "Premium",
    },
    {
      name: "Family",
      logo: Users,
      plan: "Shared",
    },
    {
      name: "Work",
      logo: CreditCard,
      plan: "Business",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/user/dashboard",
      icon: Home,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/user/dashboard",
        },
        {
          title: "Analytics",
          url: "/user/dashboard/analytics",
        },
        {
          title: "Reports",
          url: "/user/dashboard/reports",
        },
      ],
    },
    {
      title: "Spending",
      url: "/user/spending",
      icon: ShoppingBag,
      items: [
        {
          title: "Transactions",
          url: "/user/spending/transactions",
        },
        {
          title: "Categories",
          url: "/user/spending/categories",
        },
        {
          title: "Recurring",
          url: "/user/spending/recurring",
        },
      ],
    },
    {
      title: "Impulse Control",
      url: "/user/impulse",
      icon: TrendingDown,
      items: [
        {
          title: "Savings Calculator",
          url: "/user/impulse/calculator",
        },
        {
          title: "Waiting Lists",
          url: "/user/impulse/waiting-lists",
        },
        {
          title: "Decision Journal",
          url: "/user/impulse/journal",
        },
        {
          title: "Cool-down Timer",
          url: "/user/impulse/timer",
        },
      ],
    },
    {
      title: "Goals",
      url: "/user/goals",
      icon: Target,
      items: [
        {
          title: "Savings Goals",
          url: "/user/goals/savings",
        },
        {
          title: "Spending Limits",
          url: "/user/goals/limits",
        },
        {
          title: "Achievements",
          url: "/user/goals/achievements",
        },
      ],
    },
    {
      title: "Analytics",
      url: "/user/analytics",
      icon: BarChart3,
      items: [],
    },
    {
      title: "Settings",
      url: "/user/settings",
      icon: Settings2,
      items: [
        {
          title: "Account",
          url: "/user/settings/account",
        },
        {
          title: "Notifications",
          url: "/user/settings/notifications",
        },
        {
          title: "Preferences",
          url: "/user/settings/preferences",
        },
        {
          title: "Connected Accounts",
          url: "/user/settings/connected",
        },
      ],
    },
  ],
  projects: [
    {
      name: "New Car Fund",
      url: "/user/projects/car-fund",
      icon: PiggyBank,
    },
    {
      name: "Home Renovation",
      url: "/user/projects/home-renovation",
      icon: DollarSign,
    },
    {
      name: "Vacation 2025",
      url: "/user/projects/vacation",
      icon: Calendar,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
