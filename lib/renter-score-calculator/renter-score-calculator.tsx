import * as React from "react";
import { Form, RadioCards, Label, Input, SimpleSelect } from "lib/forms";
import { useForm, useWatch } from "react-hook-form";
import { useMutation } from "react-query";
import api from "../api/internal";
import { Button } from "../shared-ui";

export const RenterScoreCalculator = () => {
  const [score, setScore] = React.useState(0);
  const [propertiesPerWeek, setPropertiesPerWeek] = React.useState(0);
  const [weeksNeeded, setWeeksNeeded] = React.useState(0);
  const [viewingsNeeded, setViewingsNeeded] = React.useState(0);

  // This could be CalculatorProps but problem is with
  // type matches then so temporarily its string/string
  const methods = useForm<Record<string, string>>({
    defaultValues: {
      occupation: "fulltimer",
      who: "single",
    },
  });

  const occupation = useWatch({
    control: methods.control,
    name: "occupation",
  });

  const who = useWatch({
    control: methods.control,
    name: "who",
  });

  const mutation = useMutation(
    (data: { email: string }) => {
      return api.homes.renterScore(data);
    },
    {
      onSuccess: (data) => {
        setScore(data.data.score);
        setPropertiesPerWeek(data.data.propertiesPerWeek);
        setWeeksNeeded(data.data.weeksNeeded);
        setViewingsNeeded(data.data.viewingsNeeded);
      },
    }
  );

  return (
    <div className="px-5 py-7 border border-gray-300 rounded my-12 max-w-xl">
      <Form onSubmit={(data) => mutation.mutate(data)} methods={methods}>
        <Label id="who">Who is moving?</Label>
        <RadioCards
          id="who"
          rules={{ required: true }}
          options={[
            {
              id: "single",
              title: `Single`,
              description: `It's only me`,
            },
            {
              id: "couple",
              title: `Couple`,
              description: `Me and my partner`,
            },
            {
              id: "family",
              title: `Family`,
              description: `Me, partner and our kids`,
            },
          ]}
        />

        <div className="mt-6" />
        <Label id="pets">Do you have any pets?</Label>
        <RadioCards
          id="pets"
          rules={{ required: true }}
          options={[
            {
              id: "no",
              title: `None`,
            },
            {
              id: "dog",
              title: `Dog(s)`,
            },
            {
              id: "cat",
              title: `Cat(s)`,
            },
          ]}
          defaultValue="no"
        />

        <div className="mt-6" />
        <Label id="working">What best describes your work situation?</Label>
        <SimpleSelect
          id="occupation"
          rules={{ required: true }}
          options={[
            {
              key: "fulltimer",
              label: `Working full-time in a company for 1+ year contract`,
            },
            {
              key: "parttimer",
              label: `Working part-time / Full-time with <1 contract / Zero-hour`,
            },
            {
              key: "selfemployed",
              label: `Business owner / Freelancer / ZZP'er`,
            },
            {
              key: "unemployed",
              label: `Student / Not working / Other`,
            },
          ]}
        />

        {occupation !== "unemployed" && (
          <>
            <div className="mt-6" />
            <Label
              id="salary"
              hintText={who === "single" ? "" : "Of the whole family"}
            >
              Your gross annual income
            </Label>
            <Input
              id="salary"
              type="number"
              rules={{ required: true }}
              placeholder="€70,000"
              className="mt-1"
            />
          </>
        )}

        <div className="mt-6" />
        <Label id="bedrooms">What kind of apartment are you looking for?</Label>
        <RadioCards
          id="bedrooms"
          rules={{ required: true }}
          options={[
            {
              id: "studio",
              title: `Studio`,
            },
            {
              id: "1br",
              title: `One bedroom`,
            },
            {
              id: "2br",
              title: `Two bedrooms`,
            },
            {
              id: "3br+",
              title: `Three+ bedrooms`,
            },
          ]}
          defaultValue="1br"
        />

        <div className="mt-6" />
        <Label id="budget" hintText="Including utilities (g/w/e)">
          What's your maximum budget?
        </Label>
        <Input
          id="budget"
          type="number"
          rules={{ required: true }}
          placeholder="€1,600"
          className="mt-1"
        />

        <Button variant="primary" className="mt-3">
          Calculate
        </Button>

        <div className="mt-3">
          Score: {score} <br />
          Properties per week: {propertiesPerWeek} <br />
          Weeks needed: {weeksNeeded} <br />
          Viewings needed: {viewingsNeeded} <br />
        </div>
      </Form>
    </div>
  );
};
