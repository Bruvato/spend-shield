import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { selectUsername } from "./finishConfirmAction";

export default async function SelectName() {
  return (
    <div className="flex flex-row w-full h-screen justify-center items-center">
      <form
        action={selectUsername}
        className="flex flex-col w-96 justify-center items-center rounded-3xl py-5 px-9 space-y-3 border"
      >
        <h1 className="text-3xl">Choose a username</h1>
        <p className="py-2">This cannot be changed.</p>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="EpicMoneySaver123"
        />
        <div className="pt-3">
          <Button type="submit" size="lg">
            Select
          </Button>
        </div>
      </form>
    </div>
  );
}
