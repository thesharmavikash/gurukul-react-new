import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Download, Trophy, Star, Medal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const GTSEResults = () => {
  const classes = [6, 7, 8, 9, 10, 11, 12];
  
  const mockToppers = (classNum: number) => Array.from({ length: 10 }, (_, i) => ({
    name: `Student ${i + 1}`,
    rank: i + 1,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${classNum}-${i}`,
    score: 90 - i,
  }));

  const resultsData = classes.reduce((acc, classNum) => {
    acc[classNum] = {
      toppers: mockToppers(classNum),
      pdfUrl: `/results/gtse-class-${classNum}-2024.pdf`,
    };
    return acc;
  }, {} as Record<number, { toppers: any[], pdfUrl: string }>);

  return (
    <>
      <Helmet>
        <title>GTSE 2024 Results | Gurukul Classes Hajipur</title>
        <meta name="description" content="Check Gurukul Talent Search Examination (GTSE) 2024 Results. Top performers from Class 6 to 12." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container-narrow px-4">
            <div className="text-center mb-12 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
                <Trophy className="w-4 h-4" />
                <span>GTSE 2024</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                Gurukul Talent Search Examination Results
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Celebrating the excellence of our young talents. Select your class to view the top 10 list and download the complete merit list.
              </p>
            </div>

            <Tabs defaultValue="10" className="w-full">
              <div className="flex justify-center mb-8 overflow-x-auto">
                <TabsList className="bg-secondary/50 p-1">
                  {classes.map((classNum) => (
                    <TabsTrigger 
                      key={classNum} 
                      value={classNum.toString()}
                      className="px-6 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                    >
                      Class {classNum}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {classes.map((classNum) => (
                <TabsContent key={classNum} value={classNum.toString()} className="animate-slide-up">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Top 3 Podium */}
                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {resultsData[classNum].toppers.slice(0, 3).map((topper, idx) => (
                        <Card key={idx} className={`relative overflow-hidden border-2 ${idx === 0 ? 'border-accent ring-2 ring-accent/20 scale-105 z-10' : 'border-border'}`}>
                          {idx === 0 && (
                            <div className="absolute top-0 right-0 p-2">
                              <Star className="w-6 h-6 text-accent fill-accent" />
                            </div>
                          )}
                          <CardHeader className="text-center pb-2">
                            <div className="mx-auto w-24 h-24 rounded-full border-4 border-primary/20 p-1 mb-4">
                              <img 
                                src={topper.image} 
                                alt={topper.name} 
                                className="w-full h-full rounded-full bg-secondary"
                              />
                            </div>
                            <CardTitle className="font-serif">Rank #{topper.rank}</CardTitle>
                          </CardHeader>
                          <CardContent className="text-center">
                            <h3 className="text-xl font-bold mb-1">{topper.name}</h3>
                            <p className="text-muted-foreground">Class {classNum}</p>
                            <div className="mt-4 p-2 bg-secondary rounded-lg font-semibold text-primary">
                              Score: {topper.score}/100
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    {/* Ranks 4-10 List */}
                    <div className="lg:col-span-2">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Medal className="w-5 h-5 text-accent" />
                            Merit List (4-10)
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="divide-y divide-border">
                            {resultsData[classNum].toppers.slice(3, 10).map((topper, idx) => (
                              <div key={idx} className="py-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <span className="w-8 font-bold text-lg text-muted-foreground">#{topper.rank}</span>
                                  <img src={topper.image} alt={topper.name} className="w-10 h-10 rounded-full bg-secondary" />
                                  <span className="font-semibold">{topper.name}</span>
                                </div>
                                <div className="font-mono text-primary font-bold">{topper.score}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Download Section */}
                    <div className="lg:col-span-1">
                      <Card className="bg-primary text-primary-foreground">
                        <CardHeader>
                          <CardTitle>Complete Results</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="mb-6 opacity-90">
                            Download the full merit list for Class {classNum} including scores and qualifying status.
                          </p>
                          <Button variant="secondary" className="w-full gap-2" asChild>
                            <a href={resultsData[classNum].pdfUrl} download>
                              <Download className="w-4 h-4" />
                              Download PDF
                            </a>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default GTSEResults;
