import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, Archive, UserCheck } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function MemberDetails() {
  const { policyNo } = useParams();
  const navigate = useNavigate();
  const [promoteModalOpen, setPromoteModalOpen] = useState(false);
  const [confirmPromoteOpen, setConfirmPromoteOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Mock member data - in real app this would come from API
  const member = {
    policyNumber: "25070025",
    name: "Natsika Kanantsi",
    branch: "Ladybrand",
    idNumber: "9002047345676",
    contact: "0655302219",
    dateJoined: "July 15, 2025",
    captureDate: "2025-07-21",
    isAccountHolder: false,
    funeralPlan: {
      planName: "AFTER TEARS PACKAGE",
      coverAmount: "RN/A",
      monthlyPremium: "RN/A",
      status: "INACTIVE",
      addedBy: "Bhilili Mtebele",
      dateTimeAdded: "21 Jul 2025 15:47"
    }
  };

  const handlePromote = () => {
    setPromoteModalOpen(false);
    setConfirmPromoteOpen(true);
  };

  const confirmPromotion = () => {
    setConfirmPromoteOpen(false);
    setSuccessModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => navigate("/members")}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <h1 className="text-3xl font-semibold">Member Details</h1>
        <span className="text-lg text-muted-foreground">{member.policyNumber}</span>
      </div>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="payments">
            Payments
            <Badge variant="destructive" className="ml-2">0</Badge>
          </TabsTrigger>
          <TabsTrigger value="dependents">
            Dependents
            <Badge variant="destructive" className="ml-2">1</Badge>
          </TabsTrigger>
          {!member.isAccountHolder && (
            <TabsTrigger 
              value="promote"
              onClick={() => setPromoteModalOpen(true)}
              className="gap-2"
            >
              <UserCheck className="h-4 w-4" />
              Promote to Account Holder
            </TabsTrigger>
          )}
          <TabsTrigger value="edit" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </TabsTrigger>
          <TabsTrigger value="archive" className="gap-2">
            <Archive className="h-4 w-4" />
            Archive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">POLICY NUMBER</div>
                  <div className="mt-1">{member.policyNumber}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">NAME</div>
                  <div className="mt-1 text-primary">{member.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">BRANCH</div>
                  <div className="mt-1">{member.branch}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ID NUMBER</div>
                  <div className="mt-1">{member.idNumber}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">CONTACT</div>
                  <div className="mt-1">{member.contact}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">DATE JOINED</div>
                  <div className="mt-1">{member.dateJoined}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">CAPTURE DATE</div>
                  <div className="mt-1">{member.captureDate}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funeral Plan(s)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <div className="text-sm font-medium text-muted-foreground">PLAN NAME</div>
                  <div className="mt-1">{member.funeralPlan.planName}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">COVER AMOUNT</div>
                  <div className="mt-1">{member.funeralPlan.coverAmount}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">MONTHLY PREMIUM</div>
                  <div className="mt-1">{member.funeralPlan.monthlyPremium}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">STATUS</div>
                  <div className="mt-1">
                    <Badge variant="destructive">{member.funeralPlan.status}</Badge>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">ADDED BY</div>
                  <div className="mt-1 text-primary">{member.funeralPlan.addedBy}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-muted-foreground">DATE & TIME ADDED</div>
                  <div className="mt-1">{member.funeralPlan.dateTimeAdded}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                No payment data available for this member.
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependents">
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-muted-foreground">
                No dependents data available for this member.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Promote to Account Holder Modal */}
      <Dialog open={promoteModalOpen} onOpenChange={setPromoteModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Promote to Account Holder
            </DialogTitle>
          </DialogHeader>

          <div className="bg-blue-50 p-3 rounded-md mb-4">
            <div className="flex items-start gap-2">
              <div className="text-blue-600 mt-0.5">ℹ</div>
              <span className="text-sm text-blue-800">Click for promotion information</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>FIRST NAME</Label>
              <Input defaultValue="Natsika" />
            </div>
            <div className="space-y-2">
              <Label>SURNAME</Label>
              <Input defaultValue="Kanantsi" />
            </div>
            <div className="space-y-2">
              <Label>CELLPHONE NUMBER</Label>
              <Input defaultValue="0655302219" />
            </div>
            <div className="space-y-2">
              <Label>ID NUMBER</Label>
              <Input defaultValue="9002047345676" disabled />
              <div className="text-xs text-muted-foreground">ID Number cannot be changed for security reasons</div>
            </div>
            <div className="space-y-2 col-span-2">
              <Label>ADDRESS</Label>
              <Textarea defaultValue="39 Jackson Cove Elands Rock Nature Estate" rows={3} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={() => setPromoteModalOpen(false)}>
              CANCEL
            </Button>
            <Button onClick={handlePromote}>
              PROMOTE
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmPromoteOpen} onOpenChange={setConfirmPromoteOpen}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-blue-600">?</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Promote to Account Holder?</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Are you sure you want to promote this member to an Account Holder?
              </p>
            </div>
            <div className="flex justify-center gap-2">
              <Button onClick={confirmPromotion}>Yes, Promote</Button>
              <Button variant="outline" onClick={() => setConfirmPromoteOpen(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onOpenChange={setSuccessModalOpen}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-2xl text-green-600">✓</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Success</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Successfully promoted Natsika Kanantsi to Account Holder.
              </p>
            </div>
            <Button onClick={() => setSuccessModalOpen(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}