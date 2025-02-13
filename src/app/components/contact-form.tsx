"use client";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Modal from "./modal";

export default function ContactFormComponent() {
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
    <section id="contact">
      {isConfirmationOpen && (
        <Modal open={isConfirmationOpen} setOpen={setIsConfirmationOpen} />
      )}
      <div className="grid grid-cols-1 mdl:grid-cols-2">
        <div className="">
          <Card className="pt-10">
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      required
                      id="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      required
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
                    required
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
    </section>
  );
}
