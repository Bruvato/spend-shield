import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Link, 
  CreditCard, 
  Wallet, 
  Search, 
  BarChart, 
  RefreshCcw, 
  AlertCircle,
  Save,
  ExternalLink
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  isConnected: boolean;
  lastSync?: string;
  action?: string;
}

function IntegrationCard({ 
  title, 
  description, 
  icon, 
  iconBg, 
  iconColor, 
  isConnected, 
  lastSync, 
  action = "Connect" 
}: IntegrationCardProps) {
  return (
    <div className="flex items-start gap-4 rounded-lg border p-4">
      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconBg}`}>
        <span className={iconColor}>{icon}</span>
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          <Badge variant={isConnected ? "default" : "outline"}>
            {isConnected ? "Connected" : "Not Connected"}
          </Badge>
        </div>
        {isConnected && lastSync && (
          <div className="flex items-center text-xs text-muted-foreground">
            <RefreshCcw className="mr-1 h-3 w-3" />
            Last synced: {lastSync}
          </div>
        )}
        <div className="flex items-center justify-between pt-2">
          {isConnected ? (
            <>
              <Button variant="ghost" size="sm">
                <RefreshCcw className="mr-1 h-3 w-3" />
                Sync
              </Button>
              <Button variant="destructive" size="sm">Disconnect</Button>
            </>
          ) : (
            <Button size="sm" className="ml-auto">
              {action}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export function IntegrationSettings() {
  return (
    <>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Integrations</h3>
          <p className="text-sm text-muted-foreground">
            Connect your accounts and services to enhance your financial tracking
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Financial Institutions</CardTitle>
            <CardDescription>Connect your bank and financial accounts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <IntegrationCard
                title="Chase Bank"
                description="Connect your Chase bank accounts"
                icon={<CreditCard className="h-5 w-5" />}
                iconBg="bg-blue-100 dark:bg-blue-900"
                iconColor="text-blue-600 dark:text-blue-400"
                isConnected={true}
                lastSync="1 hour ago"
              />
              
              <IntegrationCard
                title="Bank of America"
                description="Connect your Bank of America accounts"
                icon={<CreditCard className="h-5 w-5" />}
                iconBg="bg-red-100 dark:bg-red-900"
                iconColor="text-red-600 dark:text-red-400"
                isConnected={false}
              />
              
              <IntegrationCard
                title="Wells Fargo"
                description="Connect your Wells Fargo accounts"
                icon={<CreditCard className="h-5 w-5" />}
                iconBg="bg-yellow-100 dark:bg-yellow-900"
                iconColor="text-yellow-600 dark:text-yellow-400"
                isConnected={false}
              />
            </div>
          </CardContent>
          <CardHeader className="border-t pt-6">
            <CardTitle>Payment Services</CardTitle>
            <CardDescription>Connect payment and financial services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <IntegrationCard
                title="PayPal"
                description="Track your PayPal transactions"
                icon={<Wallet className="h-5 w-5" />}
                iconBg="bg-blue-100 dark:bg-blue-900"
                iconColor="text-blue-600 dark:text-blue-400"
                isConnected={true}
                lastSync="2 days ago"
              />
              
              <IntegrationCard
                title="Venmo"
                description="Connect your Venmo account"
                icon={<Wallet className="h-5 w-5" />}
                iconBg="bg-blue-100 dark:bg-blue-900"
                iconColor="text-blue-600 dark:text-blue-400"
                isConnected={false}
              />
            </div>
          </CardContent>
          <CardHeader className="border-t pt-6">
            <CardTitle>Other Services</CardTitle>
            <CardDescription>Connect additional services and platforms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <IntegrationCard
                title="Google Calendar"
                description="Sync financial reminders with your calendar"
                icon={<Search className="h-5 w-5" />}
                iconBg="bg-red-100 dark:bg-red-900"
                iconColor="text-red-600 dark:text-red-400"
                isConnected={true}
                lastSync="1 week ago"
              />
              
              <IntegrationCard
                title="Microsoft Excel"
                description="Export your financial data to Excel"
                icon={<BarChart className="h-5 w-5" />}
                iconBg="bg-green-100 dark:bg-green-900"
                iconColor="text-green-600 dark:text-green-400"
                isConnected={false}
                action="Enable"
              />
            </div>
          </CardContent>
          <Separator />
          <CardFooter className="justify-between py-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <AlertCircle className="mr-1 h-4 w-4" />
              All connections use encrypted data transfer
            </div>
            <Button variant="outline" size="sm">
              <ExternalLink className="mr-2 h-4 w-4" />
              Find More Integrations
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Data Refresh Settings</CardTitle>
            <CardDescription>Configure how often your accounts are synchronized</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Automatic Refresh</p>
                <p className="text-sm text-muted-foreground">
                  Automatically sync your accounts on a schedule
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Hourly</div>
                <div className="text-xs text-muted-foreground">
                  Sync every hour
                </div>
              </div>
              <div className="rounded-lg border bg-secondary p-3">
                <div className="text-sm font-medium">Daily</div>
                <div className="text-xs text-muted-foreground">
                  Sync once per day
                </div>
              </div>
              <div className="rounded-lg border p-3">
                <div className="text-sm font-medium">Weekly</div>
                <div className="text-xs text-muted-foreground">
                  Sync once per week
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end">
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
