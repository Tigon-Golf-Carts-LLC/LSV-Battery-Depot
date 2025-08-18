import Header from "@/components/header";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Phone, Battery, Zap, Settings, Shield, AlertTriangle, CheckCircle, BookOpen } from "lucide-react";

export default function BatteryGuide() {
  const voltageGuide = [
    {
      voltage: "6V",
      description: "Most common golf cart voltage",
      configurations: ["36V system (6 batteries)", "48V system (8 batteries)"],
      applications: ["Standard golf carts", "Utility vehicles", "Club cars"],
      pros: ["Lower individual battery cost", "Easy to handle", "Widely compatible"],
      cons: ["More batteries needed", "More connections to maintain"]
    },
    {
      voltage: "8V",
      description: "Balanced performance option",
      configurations: ["48V system (6 batteries)", "72V system (9 batteries)"],
      applications: ["Performance golf carts", "LSV applications", "Commercial vehicles"],
      pros: ["Fewer batteries than 6V", "Good performance balance", "Professional grade"],
      cons: ["Higher individual cost", "Less common than 6V"]
    },
    {
      voltage: "12V",
      description: "High-performance solution",
      configurations: ["12V system (1 battery)", "24V system (2 batteries)", "48V system (4 batteries)"],
      applications: ["High-end golf carts", "NEV/MSV vehicles", "Performance applications"],
      pros: ["Fewest batteries needed", "Simplest wiring", "Maximum performance"],
      cons: ["Highest individual cost", "Heavier batteries"]
    }
  ];

  const technologyComparison = [
    {
      technology: "Flooded Lead-Acid",
      description: "Traditional, economical battery technology",
      lifespan: "3-5 years",
      cycleLife: "500-800 cycles",
      maintenance: "Regular maintenance required",
      price: "$",
      pros: ["Lowest upfront cost", "Proven technology", "Recyclable"],
      cons: ["Requires maintenance", "Shorter lifespan", "Ventilation needed"],
      bestFor: "Budget-conscious users, occasional use"
    },
    {
      technology: "AGM (Absorbed Glass Mat)",
      description: "Sealed, maintenance-free technology",
      lifespan: "4-6 years",
      cycleLife: "600-1000 cycles",
      maintenance: "Maintenance-free",
      price: "$$",
      pros: ["No maintenance", "Spill-proof", "Better deep-cycle performance"],
      cons: ["Higher cost than flooded", "Sensitive to overcharging"],
      bestFor: "Regular users wanting convenience"
    },
    {
      technology: "Gel",
      description: "Deep-cycle performance technology",
      lifespan: "5-7 years",
      cycleLife: "800-1200 cycles",
      maintenance: "Maintenance-free",
      price: "$$$",
      pros: ["Excellent deep-cycle", "Temperature tolerant", "Long lifespan"],
      cons: ["Higher upfront cost", "Sensitive to overcharging"],
      bestFor: "Heavy use, extreme conditions"
    },
    {
      technology: "Lithium-Ion (LiFePO4)",
      description: "Premium, long-lasting technology",
      lifespan: "8-10 years",
      cycleLife: "2000-5000 cycles",
      maintenance: "Minimal maintenance",
      price: "$$$$",
      pros: ["Longest lifespan", "Lightweight", "Fast charging", "Consistent power"],
      cons: ["Highest upfront cost", "Complex BMS required"],
      bestFor: "Maximum performance, long-term investment"
    }
  ];

  const maintenanceTips = [
    {
      category: "Daily Checks",
      tasks: [
        "Check battery connections for corrosion",
        "Ensure terminals are tight and clean",
        "Verify proper charging after use"
      ]
    },
    {
      category: "Weekly Maintenance",
      tasks: [
        "Clean battery terminals with baking soda solution",
        "Check water levels in flooded batteries",
        "Inspect cables for damage or wear"
      ]
    },
    {
      category: "Monthly Service",
      tasks: [
        "Test specific gravity in flooded batteries",
        "Equalize charge flooded batteries if needed",
        "Clean battery compartment and ensure ventilation"
      ]
    },
    {
      category: "Seasonal Care",
      tasks: [
        "Deep clean all battery components",
        "Check and calibrate charger settings",
        "Inspect mounting hardware and brackets",
        "Update maintenance records"
      ]
    }
  ];

  const installationSteps = [
    {
      step: 1,
      title: "Safety Preparation",
      description: "Disconnect power, wear safety equipment, ensure proper ventilation"
    },
    {
      step: 2,
      title: "Remove Old Batteries",
      description: "Carefully disconnect and remove existing batteries, note wiring configuration"
    },
    {
      step: 3,
      title: "Prepare Installation Area",
      description: "Clean battery compartment, inspect mounting hardware"
    },
    {
      step: 4,
      title: "Install New Batteries",
      description: "Position batteries, secure mounting, connect in proper sequence"
    },
    {
      step: 5,
      title: "Test and Commission",
      description: "Verify connections, test system operation, perform initial charge"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Complete TIGON Batteries Guide 2024
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8">
              Everything you need to know about Golf Cart Batteries, voltage configurations, 
              technology options, and maintenance from TIGON Batteries experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-844-6638">
                <Button size="lg" className="bg-tigon-orange text-white px-8 py-4 text-lg hover:bg-orange-600">
                  <Phone className="h-5 w-5 mr-2" />
                  Call TIGON Experts: 1-844-844-6638
                </Button>
              </a>
              <Button size="lg" variant="outline" asChild>
                <a href="#voltage-guide">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Start Reading Guide
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Tabs defaultValue="voltage" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="voltage">Voltage Guide</TabsTrigger>
            <TabsTrigger value="technology">Technology Comparison</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance Tips</TabsTrigger>
            <TabsTrigger value="installation">Installation Guide</TabsTrigger>
          </TabsList>

          {/* Voltage Guide Tab */}
          <TabsContent value="voltage" className="mt-8" id="voltage-guide">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Golf Cart Battery Voltage Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl">
                Understanding voltage systems is crucial for choosing the right TIGON Batteries 
                for your golf cart or electric vehicle. Each voltage has distinct advantages 
                depending on your specific needs.
              </p>
            </div>

            <div className="space-y-6">
              {voltageGuide.map((voltage) => (
                <Card key={voltage.voltage} className="overflow-hidden">
                  <CardHeader className="bg-tigon-red/5">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-2xl flex items-center">
                        <Battery className="h-6 w-6 mr-2 text-tigon-red" />
                        {voltage.voltage} Battery Systems
                      </CardTitle>
                      <Badge className="bg-tigon-green text-white">TIGON Available</Badge>
                    </div>
                    <p className="text-gray-600">{voltage.description}</p>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center">
                          <Settings className="h-4 w-4 mr-1 text-tigon-red" />
                          Configurations
                        </h4>
                        <ul className="text-sm space-y-1">
                          {voltage.configurations.map((config, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                              {config}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Applications</h4>
                        <ul className="text-sm space-y-1">
                          {voltage.applications.map((app, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                              {app}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-tigon-green">Advantages</h4>
                        <ul className="text-sm space-y-1">
                          {voltage.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-orange-600">Considerations</h4>
                        <ul className="text-sm space-y-1">
                          {voltage.cons.map((con, idx) => (
                            <li key={idx} className="flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-2 text-orange-600" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-6 bg-tigon-red text-white">
              <h3 className="text-xl font-bold mb-4">Need Help Choosing the Right Voltage?</h3>
              <p className="mb-4 text-blue-100">
                Our TIGON battery experts can help you determine the optimal voltage system 
                for your specific golf cart or electric vehicle application.
              </p>
              <a href="tel:1-844-844-6638">
                <Button className="bg-tigon-orange text-white hover:bg-orange-600">
                  <Phone className="h-4 w-4 mr-2" />
                  Call TIGON Specialists: 1-844-844-6638
                </Button>
              </a>
            </Card>
          </TabsContent>

          {/* Technology Comparison Tab */}
          <TabsContent value="technology" className="mt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Understanding Battery Technologies
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl">
                TIGON Batteries offers four distinct battery technologies, each with unique 
                advantages. Compare Flooded Lead-Acid, AGM, Gel, and Lithium options to 
                find the perfect match for your needs.
              </p>
            </div>

            <div className="space-y-6">
              {technologyComparison.map((tech) => (
                <Card key={tech.technology} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{tech.technology}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{tech.price}</Badge>
                        <Badge className="bg-tigon-green text-white">{tech.lifespan}</Badge>
                      </div>
                    </div>
                    <p className="text-gray-600">{tech.description}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Performance</h4>
                        <div className="text-sm space-y-1">
                          <div>Lifespan: <span className="font-medium">{tech.lifespan}</span></div>
                          <div>Cycles: <span className="font-medium">{tech.cycleLife}</span></div>
                          <div>Care: <span className="font-medium">{tech.maintenance}</span></div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-tigon-green">Advantages</h4>
                        <ul className="text-sm space-y-1">
                          {tech.pros.map((pro, idx) => (
                            <li key={idx} className="flex items-center">
                              <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2 text-orange-600">Considerations</h4>
                        <ul className="text-sm space-y-1">
                          {tech.cons.map((con, idx) => (
                            <li key={idx} className="flex items-center">
                              <AlertTriangle className="h-3 w-3 mr-2 text-orange-600" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="lg:col-span-2">
                        <h4 className="font-semibold mb-2">Best For</h4>
                        <p className="text-sm text-gray-600">{tech.bestFor}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Maintenance Tab */}
          <TabsContent value="maintenance" className="mt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                TIGON Battery Maintenance Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl">
                Proper maintenance extends the life of your TIGON Batteries and ensures 
                optimal performance. Follow our expert recommendations for different 
                battery technologies and maintenance schedules.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {maintenanceTips.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-tigon-red" />
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.tasks.map((task, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle className="h-4 w-4 mr-2 text-tigon-green mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Battery Technology Specific Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Technology</TableHead>
                      <TableHead>Water Levels</TableHead>
                      <TableHead>Cleaning</TableHead>
                      <TableHead>Testing</TableHead>
                      <TableHead>Special Notes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Flooded Lead-Acid</TableCell>
                      <TableCell>Check monthly, add distilled water</TableCell>
                      <TableCell>Regular terminal cleaning required</TableCell>
                      <TableCell>Test specific gravity</TableCell>
                      <TableCell>Requires ventilation</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AGM</TableCell>
                      <TableCell>Sealed, no water needed</TableCell>
                      <TableCell>Minimal cleaning required</TableCell>
                      <TableCell>Voltage testing only</TableCell>
                      <TableCell>Avoid overcharging</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gel</TableCell>
                      <TableCell>Sealed, no water needed</TableCell>
                      <TableCell>Minimal cleaning required</TableCell>
                      <TableCell>Voltage testing only</TableCell>
                      <TableCell>Temperature sensitive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lithium-Ion</TableCell>
                      <TableCell>No water maintenance</TableCell>
                      <TableCell>Keep connections clean</TableCell>
                      <TableCell>BMS monitoring</TableCell>
                      <TableCell>Software updates may be needed</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Installation Tab */}
          <TabsContent value="installation" className="mt-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Installation Guide
              </h2>
              <p className="text-lg text-gray-600 max-w-4xl">
                Proper installation is crucial for safety and optimal performance of your 
                TIGON Batteries. While we recommend professional installation, this guide 
                provides an overview of the process.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">Installation Steps</h3>
                <div className="space-y-4">
                  {installationSteps.map((step) => (
                    <Card key={step.step}>
                      <CardContent className="p-4">
                        <div className="flex items-start">
                          <div className="bg-tigon-red text-white rounded-full w-8 h-8 flex items-center justify-center font-bold mr-4 flex-shrink-0">
                            {step.step}
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{step.title}</h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Safety Requirements</h3>
                <Card className="mb-6">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center p-3 bg-red-50 rounded-lg">
                        <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                        <span className="text-sm font-medium">Always disconnect power before starting</span>
                      </div>
                      
                      <h4 className="font-semibold">Required Safety Equipment:</h4>
                      <ul className="text-sm space-y-1">
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                          Safety glasses and gloves
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                          Insulated tools
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                          Proper ventilation
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 mr-2 text-tigon-green" />
                          Fire extinguisher nearby
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-tigon-orange/10 border-tigon-orange">
                  <CardContent className="p-6 text-center">
                    <Phone className="h-8 w-8 text-tigon-orange mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Professional Installation Recommended</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      For safety and warranty compliance, we recommend professional 
                      installation by certified technicians.
                    </p>
                    <a href="tel:1-844-844-6638">
                      <Button className="bg-tigon-orange text-white hover:bg-orange-600">
                        Find Installer: 1-844-844-6638
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Final CTA Section */}
        <section className="mt-16">
          <Card className="p-8 text-center bg-gradient-to-r from-tigon-red to-tigon-green text-white">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Choose Your TIGON Batteries?
            </h3>
            <p className="text-xl mb-6 text-blue-100">
              Our battery experts can help you select the perfect configuration, 
              technology, and installation plan for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:1-844-844-6638">
                <Button size="lg" className="bg-tigon-orange text-white hover:bg-orange-600">
                  <Phone className="h-5 w-5 mr-2" />
                  Call TIGON Experts: 1-844-844-6638
                </Button>
              </a>
              <Button size="lg" variant="outline" className="bg-white text-tigon-red hover:bg-gray-100" asChild>
                <a href="/battery-selector">
                  <Zap className="h-5 w-5 mr-2" />
                  Use Battery Selector
                </a>
              </Button>
            </div>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
}
