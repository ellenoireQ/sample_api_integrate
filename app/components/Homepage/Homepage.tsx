"use client";
import {
  Calculator,
  Calendar,
  CreditCard,
  Database,
  DatabaseBackup,
  Eye,
  FileJson,
  Plus,
  Settings,
  Smile,
  Table2,
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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

interface JsonPlaceholder {
  userId: number;
  id: number;
  tittle: string;
  body: string;
}
export default function Homepage() {
  const [tableName, setTableName] = useState("");
  const [nameCols1, setNameCols1] = useState("");
  const [valueCols1, setValueCols1] = useState("");
  const [nameCols2, setNameCols2] = useState("");
  const [valueCols2, setValueCols2] = useState("");

  const [addingDb, setAddingDb] = useState(false);

  const [DB, setDB] = useState<Database[]>([]);
  const [jsonPlaceholder, setJsonPlaceholder] = useState<JsonPlaceholder[]>([]);

  const [jsonMode, setJsonMode] = useState(false);

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
      setAddingDb(false);
      console.log(e);
    }
  };

  useEffect(() => {
    handleJsonPlaceholder();
  });

  const handleJsonPlaceholder = async () => {
    try {
      const uri = await fetch("https://jsonplaceholder.typicode.com/posts");
      const res = await uri.json();
      const parsed = res.map((item: any) => ({
        id: item.id,
        userId: item.userId,
        tittle: item.title,
        body: item.body,
      }));
      setJsonPlaceholder(parsed);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="w-full h-screen flex">
      <aside>
        <Command className="md:min-w-[350px] border bg-sidebar md:block hidden">
          <CommandList>
            <CommandGroup heading="Quick Tools">
              <CommandItem onSelect={() => setAddingDb(true)}>
                <Database />
                <span>Add Database</span>
              </CommandItem>
              <CommandItem onSelect={() => setJsonMode(true)}>
                <FileJson />
                <span>Json (jsonPlaceholder)</span>
              </CommandItem>
              <CommandItem>
                <Table2 />
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
      {addingDb && jsonMode && (
        <div className="w-full flex h-full justify-center items-center">
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
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setAddingDb(false)}
              >
                Close
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}

      {!addingDb && (
        <div className="w-screen h-fit grid md:grid-cols-4 grid-cols-2 p-2 gap-4">
          {jsonPlaceholder.map((it, index) => (
            <Card className="w-full max-w-sm" key={index}>
              <CardHeader>
                <CardTitle>Table</CardTitle>
                <CardDescription>iptab</CardDescription>
                <hr></hr>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Value</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">{it.id}</TableCell>
                      <TableCell>{it.tittle}</TableCell>
                      <TableCell>{it.body}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter>
                <div className="flex w-full justify-end">
                  <Button variant={"destructive"} className="bg-red-700">
                    <Trash />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
