import React, { useState } from "react";
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
import { useDeviceContext } from "@/context/DeviceContext";

const IncomingAlert = ({
  open,
}: {
  open?: boolean;
  dataRoom?: DataRoom | null;
}) => {
  const { dataRoom, setDataRoom } = useDeviceContext();
  const [isOpen, setisOpen] = useState<boolean>(false);

  const handleAlertResponse = (action: string) => {
    //@ts-ignore
    setDataRoom((prev: DataRoom | null) => {
      if (prev) {
        return {
          ...prev,
          isRequest: false,
        };
      }
      return null;
    });

    if (action === "accept") {
      // call function from useDeviceContext to create PeerConnection
    } else {
      // close the alert
      setisOpen(false);
      return null;
    }
  };
  return (
    <AlertDialog open={open} onOpenChange={setisOpen}>
      <AlertDialogContent className="border-transparent">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Incoming Request {dataRoom?.sender?.data?.deviceName}{" "}
          </AlertDialogTitle>
          <AlertDialogDescription>
            <span className="font-bold text-yellow-400 capitalize  ">
              {dataRoom?.sender?.data?.assignedUsername}{" "}
            </span>
            wants to send you file(s).
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="border-yellow-400 mr-2 hover:bg-yellow-500/90"
            onClick={() => handleAlertResponse("cancel")}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-yellow-600  hover:bg-yellow-500/90"
            onClick={() => handleAlertResponse("accept")}
          >
            Accept
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
  //   }
};

export default IncomingAlert;
