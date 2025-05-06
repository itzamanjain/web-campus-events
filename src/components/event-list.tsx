"use client"

import { useState, useEffect } from "react"
import { CalendarDays, Clock, MapPin, Users, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"

// Mock data for events
const mockEvents = [
    {
        id: 1,
        title: "Kavi Sammelan - Mushaira",
        description: "An evening of poetry and music featuring renowned poets and artists.",
        date: "2025-05-08",
        time: "14:30 - 16:00",
        location: "Medical LT,TMU",
        club: "Poetry Club",
        category: "Cultural",
        attendees: 42,
        image: "/kavi.png",
    },
    {
        id: 2,
        title: "Annual Cultural Festival",
        description: "Celebrate diversity with performances, food, and activities from around the world.",
        date: "2025-05-20",
        time: "10:00 - 20:00",
        location: "Main Campus Square",
        club: "International Students Association",
        category: "Festival",
        attendees: 156,
        image: "/speechmaster.png",
    },
    // {
    //     id: 3,
    //     title: "AI Research Symposium",
    //     description: "Presentations on the latest advancements in artificial intelligence research.",
    //     date: "2025-05-18",
    //     time: "09:00 - 17:00",
    //     location: "Computer Science Building, Auditorium",
    //     club: "AI Research Club",
    //     category: "Academic",
    //     attendees: 89,
    //     image: "/placeholder.svg?height=200&width=300",
    // },
    // {
    //     id: 4,
    //     title: "Campus Cleanup Drive",
    //     description: "Join us in making our campus cleaner and greener.",
    //     date: "2025-05-22",
    //     time: "08:00 - 11:00",
    //     location: "Meeting at Student Center",
    //     club: "Environmental Club",
    //     category: "Volunteer",
    //     attendees: 37,
    //     image: "/placeholder.svg?height=200&width=300",
    // },
    // {
    //     id: 5,
    //     title: "Photography Workshop",
    //     description: "Learn composition techniques and editing skills from professional photographers.",
    //     date: "2025-05-25",
    //     time: "13:00 - 16:00",
    //     location: "Arts Building, Studio 5",
    //     club: "Photography Club",
    //     category: "Workshop",
    //     attendees: 28,
    //     image: "/placeholder.svg?height=200&width=300",
    // },
    // {
    //     id: 6,
    //     title: "Career Fair 2025",
    //     description: "Connect with top employers and explore internship and job opportunities.",
    //     date: "2025-05-30",
    //     time: "10:00 - 15:00",
    //     location: "University Sports Hall",
    //     club: "Career Services",
    //     category: "Career",
    //     attendees: 215,
    //     image: "/placeholder.svg?height=200&width=300",
    // },
]

// Function to format date
const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
}

export default function EventsList() {
    const [events, setEvents] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    // Simulate fetching data from an API
    useEffect(() => {
        // In a real application, you would fetch from your API here
        const fetchEvents = async () => {
            try {
                // Simulate API delay
                await new Promise((resolve) => setTimeout(resolve, 500))
                setEvents(mockEvents)
            } catch (error) {
                console.error("Error fetching events:", error)
            } finally {
                setLoading(false)
            }
        }

        fetchEvents()
    }, [])

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="bg-gray-100 rounded-lg p-6 h-80 animate-pulse"></div>
                ))}
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <div
                    key={event.id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow border border-gray-200 overflow-hidden"
                >
                    {/* Image section */}
                    <div className="relative h-70">
                        <div className="relative w-full h-70">
                            <Image
                                src={event.image || "/placeholder.svg"}
                                alt={event.title}
                                fill
                                className="object-fit w-full"
                            />
                        </div>
                        <Badge className="absolute top-4 right-4 bg-orange-600 text-white">
                            {event.category}
                        </Badge>
                    </div>

                    {/* Content section */}
                    <div className="p-5 space-y-3">
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>

                        <div className="text-sm text-gray-500 flex items-center">
                            <span className="text-orange-600 font-medium">By</span>
                            <span className="ml-2">{event.club}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                            <MapPin className="h-4 w-4 text-orange-600 mr-1" />
                            <span className="truncate">{event.location}</span>
                        </div>

                        <div className="flex items-center text-sm text-gray-500">
                            <CalendarDays className="h-4 w-4 text-orange-600 mr-1" />
                            <span>{formatDate(event.date)}</span>
                            <span className="mx-2">•</span>
                            <Clock className="h-4 w-4 text-orange-600 mr-1" />
                            <span>{event.time}</span>
                        </div>

                        {/* Footer with Join button */}
                        <div className="pt-3 flex justify-start ">
                            <Link href={`/events/${event.id}`}>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="text-orange-600 border-orange-600 hover:bg-orange-50"
                                >
                                    Join
                                    <ArrowRight className="ml-1 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )
}
