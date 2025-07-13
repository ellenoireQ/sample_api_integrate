import {
  Calculator,
  Calendar,
  CreditCard,
  Database,
  DatabaseBackup,
  Eye,
  Plus,
  Settings,
  Smile,
  Table,
  Trash,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Homepage() {
  return (
    <div className="w-full h-screen flex">
      <aside>
        <Command className="md:min-w-[350px] border bg-sidebar md:block hidden">
          <CommandList>
            <CommandGroup heading="Database">
              <CommandItem>
                <Database />
                <span>Add</span>
              </CommandItem>
              <CommandItem>
                <Trash />
                <span>Delete</span>
              </CommandItem>
              <CommandItem>
                <Eye />
                <span>Show</span>
              </CommandItem>
              <CommandItem>
                <Table />
                <span>Table</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </aside>
      <div className="w-full flex justify-center items-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>Fill your data at here!</CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Table</Label>
                  <Input id="text" type="text" placeholder="Table 1" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Col 1</Label>
                  <div className="flex gap-2">
                    <Input
                      id="text"
                      type="text"
                      placeholder="Content Name"
                      required
                    />
                    <Input id="text" type="text" placeholder="Value" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Col 2</Label>
                  <div className="flex gap-2">
                    <Input
                      id="text"
                      type="text"
                      placeholder="Content Name"
                      required
                    />
                    <Input id="text" type="text" placeholder="Value" required />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Col 3</Label>
                  <div className="flex gap-2">
                    <Input
                      id="text"
                      type="text"
                      placeholder="Content Name"
                      required
                    />
                    <Input id="text" type="text" placeholder="Value" required />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              Push
            </Button>
            <Button variant="outline" className="w-full">
              Close
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
