'use client'

import React, { useState } from 'react'
import { User, Briefcase, Compass, ChevronRight, ChevronLeft, Mail, Phone, Linkedin, Twitter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, TooltipProps } from 'recharts'
import Image from 'next/image'

// 在文件顶部添加以下类型定义
interface Project {
  id: number;
  title: string;
  description: string;
  type: string;
  duration: string;
  company: string;
  milestones: { date: string; description: string }[];
  images: string[];
  video?: string;
  skills: string[];
}

interface ColorScheme {
  primary: string;
  secondary: string;
  text: string;
  accent: string;
  gradient?: {
    fromprimary?: string;
    tosecondary?: string;
  };
}

// 修改 colorSchemes 的类型
const colorSchemes: Record<string, ColorScheme> = {
  blackWhite: { 
    primary: 'bg-[#111]', 
    secondary: 'bg-gray-100', 
    text: 'text-gray-900', 
    accent: 'bg-gray-500', 
    gradient: { fromprimary: 'from-bg-black', tosecondary: 'to-bg-gray-100' }
  },
  orange: { 
    primary: 'bg-orange-600', 
    secondary: 'bg-orange-100', 
    text: 'text-orange-900', 
    accent: 'bg-orange-400' 
  },
  blue: { 
    primary: 'bg-blue-600', 
    secondary: 'bg-blue-100', 
    text: 'text-blue-900', 
    accent: 'bg-blue-400' 
  },
  purple: { 
    primary: 'bg-purple-600', 
    secondary: 'bg-purple-100', 
    text: 'text-purple-900', 
    accent: 'bg-purple-400' 
  },
  green: { 
    primary: 'bg-green-600', 
    secondary: 'bg-green-100', 
    text: 'text-green-900', 
    accent: 'bg-green-400' 
  },
};


// 修改 projectTypes 的类型
const projectTypes: Record<string, string> = {
  UX: 'bg-pink-500',
  UI: 'bg-blue-500',
  Product: 'bg-green-500',
  Research: 'bg-yellow-500',
}

export function Portfolio() {
  const [activeSection, setActiveSection] = useState('about')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [colorScheme, setColorScheme] = useState<keyof typeof colorSchemes>('blackWhite')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [highlightedSkill, setHighlightedSkill] = useState<string | null>(null)

  const projects = [
    { 
      id: 1, 
      title: "AI-Powered Task Manager", 
      description: "Designed and managed the development of an AI-assisted task management app.",
      type: "Product",
      duration: "6 months",
      company: "TechCorp Inc.",
      milestones: [
        { date: "2023-01", description: "Project kickoff and initial research" },
        { date: "2023-03", description: "MVP launch" },
        { date: "2023-06", description: "Full feature release" },
      ],
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=300&width=400",
      ],
      video: "https://example.com/video.mp4",
      skills: ["Product Strategy", "UX Design", "Agile/Scrum"],
    },
    { 
      id: 2, 
      title: "E-commerce UX Overhaul", 
      description: "Led a comprehensive UX redesign for a major e-commerce platform.",
      type: "UX",
      duration: "4 months",
      company: "ShopEasy",
      milestones: [
        { date: "2022-09", description: "User research and analysis" },
        { date: "2022-11", description: "Prototype testing" },
        { date: "2022-12", description: "Redesign implementation" },
      ],
      images: [
        "/placeholder.svg?height=300&width=400",
        "/placeholder.svg?height=300&width=400",
      ],
      skills: ["UX Design", "User Research", "Prototyping"],
    },
    { 
      id: 3, 
      title: "HealthTech Mobile App", 
      description: "Designed the UI for a revolutionary health monitoring mobile application.",
      type: "UI",
      duration: "3 months",
      company: "HealthFirst",
      milestones: [
        { date: "2023-04", description: "Design sprint and concept development" },
        { date: "2023-05", description: "UI kit creation" },
        { date: "2023-06", description: "Final design handoff" },
      ],
      images: [
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
        "/placeholder.svg?height=400&width=300",
      ],
      skills: ["UI Design", "Prototyping"],
    },
  ]

  const skillsData = [
    { name: 'UX Design', value: 90, projects: ["E-commerce UX Overhaul"] },
    { name: 'UI Design', value: 85, projects: ["HealthTech Mobile App"] },
    { name: 'Product Strategy', value: 80, projects: ["AI-Powered Task Manager"] },
    { name: 'User Research', value: 75, projects: ["E-commerce UX Overhaul"] },
    { name: 'Prototyping', value: 85, projects: ["E-commerce UX Overhaul", "HealthTech Mobile App"] },
    { name: 'Agile/Scrum', value: 70, projects: ["AI-Powered Task Manager"] },
  ]

  const openProjectDrawer = (project: Project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
    setIsDrawerOpen(true)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % selectedProject.images.length
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex - 1 + selectedProject.images.length) % selectedProject.images.length
      )
    }
  }

  // useEffect(() => {
  //   const version = '0.1.0-beta.6';
  //   const bot_id = '7425929770846371867';
  //   const title = 'Xiao Wu';
  //   const icon = 'https://lf-bot-studio-plugin-resource.coze.cn/obj/bot-studio-platform-plugin-tos/artist/image/7e813aa2c7e14ebb9e2d1a989acfb128.png';
  //   const lang = 'zh-CN';
  //   const layout = 'pc';
  //   const width = 500;

  //   const script = document.createElement('script');
  //   script.src = `https://lf-cdn.coze.cn/obj/unpkg/flow-platform/chat-app-sdk/${version}/libs/cn/index.js`;
  //   script.async = true;
  //   script.onload = () => {
  //     // 添加类型断言
  //     const CozeWebSDK = (window as any).CozeWebSDK;
  //     if (typeof CozeWebSDK !== 'undefined') {
  //       new CozeWebSDK.WebChatClient({
  //         config: {
  //           bot_id,
  //         },
  //         componentProps: {
  //           title,
  //           icon,
  //           width,
  //         },
  //         el: document.getElementById('AiBot'),
  //       });
  //     }
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  return (
    <div className={`flex h-screen ${colorSchemes[colorScheme].secondary} ${colorSchemes[colorScheme].text}`}>
      {/* Left sidebar with main visual and navigation */}
      {/* from-${colorSchemes[colorScheme].secondary} to-${colorSchemes[colorScheme].secondary  */}
      <div className={`w-64 flex flex-col ${colorSchemes[colorScheme].primary}`}>
      {/* h-1/2 bg-gradient-to-b from-primary to-primary-foreground */}
        <div className="h-1/2 flex flex-col justify-center items-center">
          <Avatar className="w-32 h-32 border-4 border-white">
            <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile picture" />
            <AvatarFallback>OP</AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-xl font-bold text-white">Oppenheimer</h2>
          <p className="text-sm text-white">Designer & Product Manager</p>
          <p className="mt-2 text-sm text-white">Available for new projects</p>
        </div>
        
        {/* Color scheme selector */}
          <div className="flex justify-center items-center h-16 px-4">
            <div className="w-full h-1 bg-gray-200 flex">
              {Object.keys(colorSchemes).map((scheme) => (
                <button
                  key={scheme}
                  className={`flex-1 h-full transition-all duration-300 ease-in-out ${colorSchemes[scheme as keyof typeof colorSchemes].accent} ${colorScheme === scheme ? 'h-3 -mt-1' : 'hover:h-2 hover:-mt-0.5'}`}
                  onClick={() => setColorScheme(scheme as keyof typeof colorSchemes)}
                />
              ))}
            </div>
          </div>

        <nav className="mt-auto p-4 flex-grow">
          <ul className="space-y-2">
            <li>
              <Button 
                variant={activeSection === 'about' ? "secondary" : "ghost"} 
                className={`w-full justify-start ${activeSection === 'about' ? colorSchemes[colorScheme].text : 'text-gray-600'}`}
                onClick={() => setActiveSection('about')}
              >
                <User className="mr-2 h-4 w-4" /> About Us
              </Button>
            </li>
            <li>
              <Button 
                variant={activeSection === 'portfolio' ? "secondary" : "ghost"} 
                className={`w-full justify-start ${activeSection === 'portfolio' ? colorSchemes[colorScheme].text : 'text-gray-600'}`}
                onClick={() => setActiveSection('portfolio')}
              >
                <Briefcase className="mr-2 h-4 w-4" /> Portfolio
              </Button>
            </li>
            <li>
              <Button 
                variant={activeSection === 'future' ? "secondary" : "ghost"} 
                className={`w-full justify-start ${activeSection === 'future' ? colorSchemes[colorScheme].text : 'text-gray-600'}`}
                onClick={() => setActiveSection('future')}
              >
                <Compass className="mr-2 h-4 w-4" /> Future Plans
              </Button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className={`h-16 ${colorSchemes[colorScheme].accent} flex justify-between items-center px-4`}>
          <h1 className="text-xl font-bold text-white">Oppenheimer&apos;s Portfolio</h1>
          <div className="flex space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Mail className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Email: oppenheimer@example.com</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white">
                    <Phone className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Phone: +1 234 567 8900</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => window.open('https://linkedin.com', '_blank')}>
                    <Linkedin className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LinkedIn Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-white" onClick={() => window.open('https://twitter.com', '_blank')}>
                    <Twitter className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Twitter Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-auto">
          {activeSection === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">About Us</h2>
              <p>I am a passionate designer and product manager with experience in creating user-centered digital products. My approach combines design thinking with strategic product management to deliver exceptional user experiences.</p>
            </div>
          )}

          {activeSection === 'portfolio' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((project) => (
                  <div key={project.id} className={`bg-white p-4 rounded shadow`}>
                    <div className={`text-xs font-semibold mb-2 inline-block px-2 py-1 rounded text-white ${projectTypes[project.type]}`}>
                      {project.type}
                    </div>
                    <h3 className={`font-bold mb-2 ${colorSchemes[colorScheme].text}`}>{project.title}</h3>
                    <p className="text-sm mb-2">{project.description}</p>
                    <p className="text-xs mb-4">Duration: {project.duration} | Company: {project.company}</p>
                    <Button onClick={() => openProjectDrawer(project)} variant="outline" className="group">
                      Explore Project 
                      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === 'future' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Future Plans & Skills</h2>
              <ul className="list-disc list-inside space-y-2 mb-8">
                <li>Exploring the intersection of AI and user experience design</li>
                <li>Developing sustainable and accessible digital products</li>
                <li>Mentoring aspiring designers and product managers</li>
                <li>Contributing to open-source design systems</li>
              </ul>
              
              <h3 className="text-xl font-bold mb-4">Skills & Proficiency</h3>
              <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={skillsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="name" type="category" />
                      <RechartsTooltip 
                        content={(props: TooltipProps<number, string>) => {
                          if (props.active && props.payload && props.payload.length) {
                            const data = props.payload[0].payload as {
                              name: string;
                              value: number;
                              projects: string[];
                            };
                            return (
                              <div className="bg-white p-2 border rounded shadow">
                                <p className="font-bold">{data.name}</p>
                                <p>熟练度: {data.value}%</p>
                                <p>项目: {data.projects.join(", ")}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        fill={colorSchemes[colorScheme].accent}
                        onMouseEnter={(data: { name: string }) => setHighlightedSkill(data.name)}
                        onMouseLeave={() => setHighlightedSkill(null)}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillsData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="name" />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Skills"
                        dataKey="value"
                        stroke={colorSchemes[colorScheme].accent}
                        fill={colorSchemes[colorScheme].accent}
                        fillOpacity={0.3}
                      />
                      {highlightedSkill && (
                        <Radar
                          name={highlightedSkill}
                          dataKey="value"
                          stroke={colorSchemes[colorScheme].accent}
                          fill={colorSchemes[colorScheme].accent}
                          fillOpacity={0.6}
                          strokeWidth={3}
                        />
                      )}
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Project details drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="w-[400px] sm:w-[540px] sm:max-w-[60vw]">
          <SheetHeader>
            <SheetTitle>{selectedProject?.title}</SheetTitle>
            <SheetDescription>
              {selectedProject?.description}
            </SheetDescription>
          </SheetHeader>
          <div className="mt-4 space-y-4">
            <div className="relative">
              <Image
                src={selectedProject?.images[currentImageIndex] || '/default-placeholder.svg'}
                alt={`${selectedProject?.title} - Image ${currentImageIndex + 1}`}
                className="w-full h-64 object-cover rounded-lg"
                width={400}
                height={300}
              />
              {selectedProject && selectedProject.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
            {selectedProject?.video && (
              <video controls className="w-full rounded-lg">
                <source src={selectedProject.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            <div>
              <h3 className="font-bold mb-2">Project Details</h3>
              <p><strong>Type:</strong> {selectedProject?.type}</p>
              <p><strong>Duration:</strong> {selectedProject?.duration}</p>
              <p><strong>Company:</strong> {selectedProject?.company}</p>
            </div>
            <div>
              <h3 className="font-bold mb-2">Project Timeline</h3>
              <ul className="space-y-2">
                {selectedProject?.milestones.map((milestone, index) => (
                  <li key={index} className="flex items-start">
                    <div className="mr-2 mt-1 h-2 w-2 rounded-full bg-blue-500"></div>
                    <div>
                      <p className="font-semibold">{milestone.date}</p>
                      <p>{milestone.description}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
      {/* <div id="AiBot"  ></div> */}
    </div>
  )
}
