import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Phone, Car, Home, Zap, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { type BatteryQuizState } from "@/types";

const QUIZ_STEPS = [
  {
    title: "Select Your Vehicle Type",
    description: "Choose the type of electric vehicle you need batteries for"
  },
  {
    title: "Choose Voltage System", 
    description: "Select your vehicle's voltage system"
  },
  {
    title: "Usage Patterns",
    description: "How will you use your vehicle?"
  },
  {
    title: "Budget Range",
    description: "What's your budget for battery replacement?"
  }
];

interface BatterySelectorQuizProps {
  onComplete?: (results: BatteryQuizState) => void;
}

export default function BatterySelectorQuiz({ onComplete }: BatterySelectorQuizProps) {
  const [quizState, setQuizState] = useState<BatteryQuizState>({
    vehicleType: "",
    voltageSystem: "",
    usage: "",
    budget: "",
    currentStep: 0
  });

  const vehicleTypes = [
    { id: "golf-cart", name: "Golf Cart", description: "Most Popular", icon: Car },
    { id: "lsv", name: "LSV", description: "Low Speed Vehicle", icon: Car },
    { id: "nev", name: "NEV", description: "Neighborhood Electric", icon: Home },
    { id: "msv", name: "MSV", description: "Medium Speed Vehicle", icon: Zap }
  ];

  const voltageSystems = [
    { id: "36v", name: "36V", description: "6 batteries × 6V" },
    { id: "48v", name: "48V", description: "6 batteries × 8V or 8 batteries × 6V" },
    { id: "72v", name: "72V", description: "6 batteries × 12V" },
    { id: "not-sure", name: "Not Sure", description: "We'll help you determine this" }
  ];

  const usagePatterns = [
    { id: "light", name: "Light Use", description: "Recreational, weekend use" },
    { id: "moderate", name: "Moderate Use", description: "Regular daily use" },
    { id: "heavy", name: "Heavy Use", description: "Commercial, frequent use" },
    { id: "professional", name: "Professional", description: "Fleet, high-demand use" }
  ];

  const budgetRanges = [
    { id: "economy", name: "Economy", description: "Under $500", range: "$200-$500" },
    { id: "standard", name: "Standard", description: "$500-$1000", range: "$500-$1000" },
    { id: "premium", name: "Premium", description: "$1000-$2000", range: "$1000-$2000" },
    { id: "professional", name: "Professional", description: "$2000+", range: "$2000+" }
  ];

  const handleSelection = (field: keyof BatteryQuizState, value: string) => {
    setQuizState(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (quizState.currentStep < QUIZ_STEPS.length - 1) {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
    } else {
      onComplete?.(quizState);
    }
  };

  const prevStep = () => {
    if (quizState.currentStep > 0) {
      setQuizState(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    }
  };

  const canProceed = () => {
    switch (quizState.currentStep) {
      case 0: return quizState.vehicleType;
      case 1: return quizState.voltageSystem;
      case 2: return quizState.usage;
      case 3: return quizState.budget;
      default: return false;
    }
  };

  const progress = ((quizState.currentStep + 1) / QUIZ_STEPS.length) * 100;

  return (
    <Card className="max-w-4xl mx-auto">
      <CardContent className="p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-900">
              Step {quizState.currentStep + 1} of {QUIZ_STEPS.length}: {QUIZ_STEPS[quizState.currentStep].title}
            </h3>
            <div className="text-sm text-gray-500">Progress: {Math.round(progress)}%</div>
          </div>
          <Progress value={progress} className="h-2 mb-4" />
          <p className="text-gray-600">{QUIZ_STEPS[quizState.currentStep].description}</p>
        </div>

        {/* Step 0: Vehicle Type */}
        {quizState.currentStep === 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {vehicleTypes.map((type) => {
              const Icon = type.icon;
              const isSelected = quizState.vehicleType === type.id;
              return (
                <button
                  key={type.id}
                  onClick={() => handleSelection("vehicleType", type.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-center ${
                    isSelected 
                      ? "battery-selector-active border-tigon-red" 
                      : "border-gray-200 hover:border-tigon-red"
                  }`}
                >
                  <Icon className={`h-8 w-8 mx-auto mb-3 ${isSelected ? "text-white" : "text-gray-400"}`} />
                  <div className={`font-semibold ${isSelected ? "text-white" : "text-gray-700"}`}>
                    {type.name}
                  </div>
                  <div className={`text-sm ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                    {type.description}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 1: Voltage System */}
        {quizState.currentStep === 1 && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {voltageSystems.map((voltage) => {
              const isSelected = quizState.voltageSystem === voltage.id;
              return (
                <button
                  key={voltage.id}
                  onClick={() => handleSelection("voltageSystem", voltage.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected 
                      ? "battery-selector-active border-tigon-red" 
                      : "border-gray-200 hover:border-tigon-red"
                  }`}
                >
                  <div className={`font-semibold text-lg mb-2 ${isSelected ? "text-white" : "text-gray-700"}`}>
                    {voltage.name}
                  </div>
                  <div className={`text-sm ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                    {voltage.description}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 2: Usage Patterns */}
        {quizState.currentStep === 2 && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {usagePatterns.map((usage) => {
              const isSelected = quizState.usage === usage.id;
              return (
                <button
                  key={usage.id}
                  onClick={() => handleSelection("usage", usage.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected 
                      ? "battery-selector-active border-tigon-red" 
                      : "border-gray-200 hover:border-tigon-red"
                  }`}
                >
                  <div className={`font-semibold text-lg mb-2 ${isSelected ? "text-white" : "text-gray-700"}`}>
                    {usage.name}
                  </div>
                  <div className={`text-sm ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                    {usage.description}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Step 3: Budget Range */}
        {quizState.currentStep === 3 && (
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            {budgetRanges.map((budget) => {
              const isSelected = quizState.budget === budget.id;
              return (
                <button
                  key={budget.id}
                  onClick={() => handleSelection("budget", budget.id)}
                  className={`p-6 rounded-xl border-2 transition-all duration-200 text-left ${
                    isSelected 
                      ? "battery-selector-active border-tigon-red" 
                      : "border-gray-200 hover:border-tigon-red"
                  }`}
                >
                  <div className={`font-semibold text-lg mb-2 ${isSelected ? "text-white" : "text-gray-700"}`}>
                    {budget.name}
                  </div>
                  <div className={`text-sm ${isSelected ? "text-blue-100" : "text-gray-500"}`}>
                    {budget.description}
                  </div>
                  <div className={`text-xs mt-1 ${isSelected ? "text-blue-200" : "text-gray-400"}`}>
                    {budget.range}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={quizState.currentStep === 0}
            className="flex items-center"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          
          <div className="text-center">
            <div className="text-sm text-gray-600 mb-2">Or get instant help:</div>
            <a 
              href="tel:1-844-844-6638" 
              className="text-tigon-red font-semibold hover:underline flex items-center"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call 1-844-844-6638
            </a>
          </div>
          
          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="bg-tigon-red text-white hover:bg-blue-700 flex items-center"
          >
            {quizState.currentStep === QUIZ_STEPS.length - 1 ? (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Get Results
              </>
            ) : (
              <>
                Next
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
