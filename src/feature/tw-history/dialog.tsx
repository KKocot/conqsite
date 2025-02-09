import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAddHistoryPostMutation } from "@/components/hooks/use-history-post-mutation";
import { useEffect, useState } from "react";

const visibilityOptions = ["House", "Command", "Me"];

const DEFAULT_FORM_VALUES = {
  title: "",
  visibleTo: "",
  description: "",
  author: "",
  house: "",
  twDate: new Date(),
  ytUrl: "",
  publicDate: new Date(),
};
const twHistorySchema = z.object({
  twDate: z.date(),
  ytUrl: z.string().url(),
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(50, "Title must be less than 50 characters"),
  description: z
    .string()
    .max(250, "Description must be less than 250 characters"),
  visibleTo: z.string().min(1, "Select visibility"),
  house: z.string(),
  author: z.string(),
  publicDate: z.date(),
  authorID: z.string(),
});

interface AddDialogProps {
  house: string;
  author: string;
  authorID: string;
}

const AddDialog = ({ house, author, authorID }: AddDialogProps) => {
  const mutationFn = useAddHistoryPostMutation();
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof twHistorySchema>>({
    resolver: zodResolver(twHistorySchema),
    defaultValues: DEFAULT_FORM_VALUES,
  });
  form.setValue("house", house);
  form.setValue("author", author);
  form.setValue("authorID", authorID);

  const onSubmit = (values: z.infer<typeof twHistorySchema>) => {
    mutationFn.mutate(values);
    mutationFn.isSuccess && (setOpen(false), form.reset());
  };
  useEffect(() => {
    if (mutationFn.isSuccess) {
      form.reset();
      setOpen(false);
    }
  }, [mutationFn.isPending, mutationFn.isSuccess, form]);
  const pending = mutationFn.isPending;
  return (
    <Dialog open={open} onOpenChange={(value) => !pending && setOpen(value)}>
      <DialogTrigger asChild>
        <Button
          variant="custom"
          className="rounded-full p-2 fixed bottom-4 right-4 z-50"
        >
          <PlusCircle />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Post</DialogTitle>
          <DialogDescription>
            Fill in the form below to add a new post.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex justify-between">
              <div className="flex flex-col gap-2">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="visibleTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Visibility</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {visibilityOptions.map((e) => (
                              <SelectItem value={e} key={e}>
                                {e}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ytUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Youtube POV</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="twDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>TW Date</FormLabel>
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                onClick={() => {
                  setOpen(false);
                  form.reset();
                }}
                className="text-destructive"
                variant="link"
              >
                Cancel
              </Button>
              <Button type="submit" variant="custom" disabled={pending}>
                Add
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
