"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "./modal";

export default function ContactFormComponent() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch(
      "https://getform.io/f/2128cedd-9e39-41fa-bbdf-ab44725490e9",
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      }
    );
    console.log(response);

    if (response.ok) {
      setIsConfirmationOpen(true);
      console.log(isConfirmationOpen);
    }
  };

  return (
    <section
      id="contact"
      className="flex flex-col max-w-full w-full gap-8 mx-auto"
    >
      {isConfirmationOpen && (
        <Modal open={isConfirmationOpen} setOpen={setIsConfirmationOpen} />
      )}
      <div className="relative flex justify-center min-h-screen items-top">
        <div className="max-w-full mx-auto sml:px-6 lg:px-8">
          <div className="overflow-hidden">
            <div className="grid grid-cols-1 mdl:grid-cols-2">
              <div className="p-6 mr-2 sm:rounded-lg">
                <Card className="max-w-2xl mx-auto p-6 sm:p-8 md:p-10">
                  <CardHeader>
                    <CardTitle className="text-3xl font-bold">
                      Get in Touch
                    </CardTitle>
                    <CardDescription>
                      Have a question or want to work together? Fill out the
                      form below and we'll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="grid gap-4" onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          rows={5}
                          placeholder="How can we help you?"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>
                      <CardFooter className="flex justify-end">
                        <Button
                          type="submit"
                          className="hover:bg-primary hover:text-primary-foreground transition-colors"
                        >
                          Submit
                        </Button>
                      </CardFooter>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
