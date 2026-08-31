import PageContainer from "../../components/layout/PageContainer";
import SectionHeading from "../../components/common/SectionHeading";
import DataTable from "../../components/common/DataTable";
import Badge from "../../components/common/Badge";
import Button from "../../components/common/Button";
import { useData } from "../../context/DataContext";

const ROLE_LABEL = {
  customer: "Customer",
  repair_partner: "Repair Partner",
  admin: "Administrator",
};

function Users() {
  const { users, updateUser } = useData();

  function toggleStatus(user) {
    updateUser(user.id, {
      status: user.status === "Active" ? "Suspended" : "Active",
    });
  }

  return (
    <PageContainer className="space-y-6 py-8">
      <SectionHeading
        eyebrow="Users"
        title="Platform Users"
        description="Manage customer and repair partner accounts. New registrations appear here immediately."
      />

      <DataTable
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          {
            key: "role",
            label: "Role",
            render: (row) => <Badge variant="neutral">{ROLE_LABEL[row.role]}</Badge>,
          },
          {
            key: "status",
            label: "Status",
            render: (row) => (
              <Badge variant={row.status === "Active" ? "green" : "danger"}>
                {row.status}
              </Badge>
            ),
          },
          { key: "createdAt", label: "Joined" },
        ]}
        rows={users}
        renderActions={(row) => (
          <Button size="sm" variant="outline" onClick={() => toggleStatus(row)}>
            {row.status === "Active" ? "Suspend" : "Reactivate"}
          </Button>
        )}
      />
    </PageContainer>
  );
}

export default Users;
