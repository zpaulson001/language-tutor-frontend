import { ActionFunctionArgs } from '@remix-run/node';
import { z } from 'zod';
import { Form, json, useActionData } from '@remix-run/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Label } from '@radix-ui/react-label';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

// Define the email schema using Zod
const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type Errors = {
  email?: string[];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email');

  const errors: Errors = {};

  const result = emailSchema.safeParse({ email });

  if (result.error) {
    errors.email = result.error.flatten().fieldErrors.email;
    return json(errors);
  }

  return null;
}

export default function Login() {
  const errors = useActionData<typeof action>();

  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Log in</CardTitle>
          <CardDescription>
            {"Enter your email, and we'll send you a link to log in."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form id="login" method="post">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" />
                {errors?.email ? (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                ) : null}
              </div>
            </div>
          </Form>
        </CardContent>
        <CardFooter className="flex">
          <Button type="submit" className="w-full" form="login">
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
