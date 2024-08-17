"use client";
import { useState } from "react";
import { useFormState } from "react-dom";
import { addNewProject } from "../logic/logic";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogOverlay,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "@/components/ui/textarea";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { GlobeIcon, StoreIcon } from "lucide-react";

const AddNewProjectButton = () => {
  const initialState = {
    errors: [],
    linksState: [{ type: "", href: "" }],
    toolsState: [""],
  };
  const [state, formAction] = useFormState(addNewProject, initialState);
  const [tools, setTools] = useState<string[]>([""]);
  const [links, setLinks] = useState<{ type: string; href: string }[]>([
    { type: "", href: "" },
  ]);

  const handleToolChange = (index: number, value: string) => {
    const newTools = [...tools];
    newTools[index] = value;
    setTools(newTools);
    initialState.toolsState = newTools;
  };

  const addTool = () => {
    setTools([...tools, ""]);
  };

  const removeTool = (index: number) => {
    const newTools = tools.filter((_, i) => i !== index);
    setTools(newTools);
    initialState.toolsState = newTools;
  };

  const handleLinkChange = (index: number, field: string, value: string) => {
    const newLinks = [...links];
    newLinks[index] = { ...newLinks[index], [field]: value };
    setLinks(newLinks);
    initialState.linksState = newLinks;
  };

  const addLink = () => {
    setLinks([...links, { type: "", href: "" }]);
  };

  const removeLink = (index: number) => {
    const newLinks = links.filter((_, i) => i !== index);
    setLinks(newLinks);
    initialState.linksState = newLinks;
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="h-8 gap-1">
          Add New Project
        </Button>
      </DialogTrigger>
      <DialogOverlay className="overflow-y-auto opacity-5">
        <DialogContent>
          <form className="space-y-1.5">
            <div>
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input type="text" id="name" name="name" required />
            </div>
            <div>
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea id="description" name="description" />
            </div>
            <div>
              <Label className="text-right">Tools</Label>
              {tools.map((tool, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="text"
                    value={tool}
                    name="tools"
                    onChange={(e) => handleToolChange(index, e.target.value)}
                    required
                  />
                  <Button type="button" onClick={() => removeTool(index)}>
                    Remove
                  </Button>
                </div>
              ))}
              <Button type="button" onClick={addTool}>
                Add Tool
              </Button>
            </div>
            <div>
              <Label htmlFor="dates" className="text-right">
                Dates
              </Label>
              <Input type="text" id="dates" name="dates" />
            </div>
            <div>
              <Label htmlFor="links" className="text-right">
                Links
              </Label>
              <div className="flex gap-2 mb-2 items-center">
                <GitHubLogoIcon height={25} width={25} />
                <Input name={`ghlink`} placeholder="Github Link" />
              </div>
              <div className="flex gap-2 mb-2 items-center">
                <StoreIcon height={25} width={25} />
                <Input name={`storelink`} placeholder="Store Link" />
              </div>
              <div className="flex gap-2 mb-2 items-center">
                <GlobeIcon height={25} width={25} />
                <Input name={`demolink`} placeholder="Demo Link" />
              </div>
            </div>
            <div>
              <Label htmlFor="images" className="text-right">
                Images
              </Label>
              <Input
                id="images"
                name="images"
                type="file"
                multiple
                className="col-span-3"
              />
            </div>
            {state?.errors?.length > 0 && (
              <div>
                <h3>Errors:</h3>
                <ul>
                  {state?.errors?.map((error, index) => (
                    <li key={index} className="text-base text-red-500">
                      {error.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <DialogFooter>
              <Button type="submit" formAction={formAction}>
                Add Project
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
};

export default AddNewProjectButton;
