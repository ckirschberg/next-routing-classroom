"use client";
import { TextInput } from '@mantine/core';
import "@mantine/dates/styles.css";
import classes from './ContainedInput.module.css';
import { Button, Text } from "@mantine/core";

import { DateTimePicker } from "@mantine/dates";

import { useState } from "react";

export default function CreateEventForm() {
  const date = new Date();
  const hours = date.getHours();
  const date2 = new Date();
  date2.setHours(hours + 1);

  const [startsAt, setStartsAt]= useState<Date | null>(null);
  const [endsAt, setEndsAt] = useState<Date | null>(null);
  const [title, setTitle] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!startsAt || !endsAt) return;

    const res = await fetch("/api/sessions", {
      method: "POST",
      body: JSON.stringify({
        // venstre side af : = supabase tabellens kolonne.
        // højre side af : = state variablen
        starts_at: startsAt.toISOString(),
        ends_at: endsAt.toISOString(),
        title: title
      }),
      headers: { "Content-Type": "application/json" },
    });

    console.log(await res.json());
  }

  return (
    <form onSubmit={handleSubmit}>
      <Text size="xl" fw={700} mb="md">
        Create your event here....
      </Text>

      <TextInput label="Session Title" placeholder="NextJs 2" classNames={classes} style={{ width: "180px" }}
        onChange={(e) => setTitle(e.target.value)} value={title}/>

      <DateTimePicker
        style={{ width: "180px" }}
        label="Start dato/tid"
        maxDate={endsAt ? endsAt : undefined}
        value={startsAt ? startsAt.toISOString() : null} // or your preferred format
        onChange={(value) => {
          setStartsAt(value ? new Date(value) : null);
        }}
      />
      <DateTimePicker
        style={{ width: "180px" }}
        label="Slut dato/tid"
        minDate={startsAt ? startsAt : undefined}
        value={endsAt ? endsAt.toISOString() : null} // or your preferred format
        onChange={(value) => {
          setEndsAt(value ? new Date(value) : null);
        }}
      />

      <Button className="mt-4" type="submit" variant="filled">
        Click me
      </Button>
    </form>
  );
}
