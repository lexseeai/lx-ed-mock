import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface PlaceholderPageProps {
  title: string;
  description: string;
  backLink?: string;
  backText?: string;
}

export default function PlaceholderPage({ 
  title, 
  description, 
  backLink = "/", 
  backText = "Back to Dashboard" 
}: PlaceholderPageProps) {
  return (
    <div className="min-h-screen-safe bg-stone-100 flex items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center space-y-6">
          <div className="mx-auto w-16 h-16 bg-stone-200 rounded-full flex items-center justify-center">
            <Construction className="w-8 h-8 text-stone-500" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          
          <Link to={backLink}>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              {backText}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
