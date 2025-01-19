"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Plus, X } from "lucide-react"
import { useMutationState } from "@/hooks/useMutationState"
import { api } from "@/convex/_generated/api"
import { toast } from "sonner"
import { ConvexError } from "convex/values"
import { useContent } from "@/hooks/useContent"
import { useQuery } from "convex/react"
import Anonymous from "./Anonymous"

const FormSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters.",
    }),
    content: z.string().min(2, { message: 'Content must be at least 2 characters.' }),
    category: z.string().min(1, { message: 'Please select a category.' }),
    tags: z.array(z.string()).optional()
})

export function CreatePost() {
    const [tags, setTags] = useState<string[]>([])
    const [currentInterest, setCurrentInterest] = useState('')
    const { mutate: createPost } = useMutationState(api.posts.createPost);
    const { mutate: createConfee } = useMutationState(api.guests.createPost);
    const guest = useQuery(api.guests.getId);
    console.log(guest);


    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            title: "",
            content: "",
            category: "",
            tags: [],
        },
    })

    const paths = useContent();
    const currentPath = paths.find((p) => p.active); 

    const onSubmit = (data: z.infer<typeof FormSchema>) => {
        const submitFunction =
            currentPath?.post === "anonymous-confessions" ? createConfee : createPost;

        submitFunction({ ...data, tags }).then(() => { toast.success('Post created!') }).catch((error) => {
            toast.error(error instanceof ConvexError ? error.message : 'Unexpected error occurred');
        });
        setTags([]);
        form.reset();
    }

    if(currentPath?.post === "anonymous-confessions" && !guest){
        return <Anonymous/>
    }

    const handleInterestKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && currentInterest.trim() !== "") {
            e.preventDefault();
            setTags((prev) => [...prev, currentInterest.trim()])
            setCurrentInterest('')
        }
    }

    const handleRemoveInterest = (index: number) => {
        setTags((prev) => prev.filter((_, i) => i !== index))
    }

    return (
        <Dialog>
            <div className="flex items-center">
                <DialogTrigger asChild>
                    <Button variant={'default'}>Create Post <Plus size={12} strokeWidth={2.4} /></Button>
                </DialogTrigger>
            </div>
            <DialogContent className="w-full lg:ml-10">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter title" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            This is the title of your post.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="content"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Content</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Write your post content here"
                                                className="resize-none min-h-40 no-scrollbar"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            You can add more details here.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Category Field */}
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Post Categories</SelectLabel>
                                                        <SelectItem value="growth">Personal Growth & Self-Discovery</SelectItem>
                                                        <SelectItem value="adversity">Overcoming Adversity</SelectItem>
                                                        <SelectItem value="grief">Loss & Healing</SelectItem>
                                                        <SelectItem value="love">Love & Relationships</SelectItem>
                                                        <SelectItem value="friendship">Friendship & Bonds</SelectItem>
                                                        <SelectItem value="family">Parenthood & Family Life</SelectItem>
                                                        <SelectItem value="career">Career & Ambitions</SelectItem>
                                                        <SelectItem value="travel">Travel & Exploration</SelectItem>
                                                        <SelectItem value="dreams">Chasing Dreams & Aspirations</SelectItem>
                                                        <SelectItem value="advocacy">Social Change & Advocacy</SelectItem>
                                                        <SelectItem value="activism">Activism & Raising Awareness</SelectItem>
                                                        <SelectItem value="health">Health & Wellness Journey</SelectItem>
                                                        <SelectItem value="selfcare">Self-Care & Mindfulness</SelectItem>
                                                        <SelectItem value="life-lessons">Life Lessons & Wisdom</SelectItem>
                                                        <SelectItem value="gratitude">Gratitude & Positivity</SelectItem>
                                                        <SelectItem value="identity">Cultural Identity & Heritage</SelectItem>
                                                        <SelectItem value="generations">Generational Stories</SelectItem>
                                                        <SelectItem value="resilience">Survival & Resilience</SelectItem>
                                                        <SelectItem value="creative">Creative Pursuits & Hobbies</SelectItem>
                                                        <SelectItem value="real-adventures">Real-Life Adventure</SelectItem>
                                                        <SelectItem value="acts-of-kindness">Acts of Kindness & Giving Back</SelectItem>
                                                        <SelectItem value="miscellaneous">Miscellaneous</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormDescription>
                                            Select the category that best fits your post.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        {/* Interests Field */}
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="tags"
                                render={() => (
                                    <FormItem className="flex flex-row justify-between items-center">
                                        <div className="flex-1 p-2">
                                            <FormLabel>Tags</FormLabel>
                                            <FormDescription>Enter tags (press Enter to add each).</FormDescription>
                                        </div>
                                        <div className="flex-1 p-2">
                                            <FormControl>
                                                <Input
                                                    value={currentInterest}
                                                    onChange={(e) => setCurrentInterest(e.target.value)}
                                                    onKeyDown={handleInterestKeyDown}
                                                    placeholder="Add Interests"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <div className="mt-2 flex flex-wrap gap-2">
                                {tags.map((tag, index) => (
                                    <Badge key={index} variant="outline" className="text-card-foreground text-[13px] rounded-full mr-2">
                                        {tag}
                                        <X
                                            size={14}
                                            strokeWidth={3.4}
                                            className="text-red-800 cursor-pointer ml-2"
                                            onClick={() => handleRemoveInterest(index)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={form.handleSubmit(onSubmit)}>Save changes</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}