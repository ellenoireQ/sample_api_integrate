"use client";
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
import { useEffect, useState } from "react";
import { db } from "../backend/database/firebase";
import { getAuth } from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";

interface Database {
  table_name: string;
  cols: [
    {
      name1: string;
      value1: any;
      name2: string;
      value2: string;
    }
  ];
}
export default function Homepage() {
  const [tableName, setTableName] = useState("");
  const [nameCols1, setNameCols1] = useState("");
  const [valueCols1, setValueCols1] = useState("");
  const [nameCols2, setNameCols2] = useState("");
  const [valueCols2, setValueCols2] = useState("");

  const [DB, setDB] = useState<Database[]>([]);
  const handleSubmit = async () => {
    //const db = await getAuth();
    try {
      const dbX = await addDoc(collection(db, "user"), {
        table_name: tableName,
        nameCols1: nameCols1,
        valueCols1: valueCols1,
        nameCols2: nameCols2 ? nameCols2 : null,
        valueCols2: valueCols2 ? valueCols2 : null,
      });
      console.log(dbX);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    DB.map((it) => {
      console.log(it.table_name);
    });
  });
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
                  <Input
                    id="text"
                    type="text"
                    placeholder="Table 1"
                    onChange={(e) => {
                      setTableName(e.target.value);
                    }}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Col 1</Label>
                  <div className="flex gap-2">
                    <Input
                      id="text"
                      type="text"
                      placeholder="Content Name"
                      required
                      onChange={(e) => setNameCols1(e.target.value)}
                    />
                    <Input
                      id="text"
                      type="text"
                      placeholder="Value"
                      required
                      onChange={(e) => setValueCols1(e.target.value)}
                    />
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
                      onChange={(e) => setNameCols2(e.target.value)}
                    />
                    <Input
                      id="text"
                      type="text"
                      placeholder="Value"
                      required
                      onChange={(e) => setValueCols2(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              onClick={() => handleSubmit()}
            >
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
