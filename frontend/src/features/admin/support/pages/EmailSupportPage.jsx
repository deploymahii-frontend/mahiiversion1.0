import {
  FiMail,
  FiSearch,
  FiRefreshCw,
  FiDownload,
  FiSend,
  FiPaperclip,
  FiEye,
  FiClock,
  FiUser,
} from "react-icons/fi";

export default function EmailSupportPage({
  loading,
  emails = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onReply,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const statusBadge = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Open":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiMail />
            Email Support
          </h2>

          <p className="text-gray-500">
            Manage customer emails, shared inboxes, and email-to-ticket workflows.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            <FiDownload className="mr-2 inline"/>
            Export
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search email..."
            className="w-full rounded-lg border py-2 pl-10 pr-4"
          />

        </div>

      </div>

      {/* Email Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Subject</th>
              <th className="p-4 text-center">Assigned</th>
              <th className="p-4 text-center">Received</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {emails.map((mail)=>(

              <tr
                key={mail.id}
                className="border-t"
              >

                <td className="p-4">
                  {mail.customer}
                </td>

                <td className="p-4 font-medium">
                  {mail.subject}
                </td>

                <td className="p-4 text-center">
                  <FiUser className="mr-2 inline"/>
                  {mail.agent}
                </td>

                <td className="p-4 text-center">
                  <FiClock className="mr-2 inline"/>
                  {mail.received}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(mail.status)}`}>
                    {mail.status}
                  </span>

                </td>

                <td className="p-4 text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onView?.(mail)}
                      className="rounded border p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onReply?.(mail)}
                      className="rounded border p-2"
                    >
                      <FiSend/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMail className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Shared Inbox</h3>
          <p className="mt-2 text-gray-500">
            Centralized support mailbox.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiPaperclip className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Attachments</h3>
          <p className="mt-2 text-gray-500">
            Secure document management.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiSend className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">Auto Replies</h3>
          <p className="mt-2 text-gray-500">
            Automated acknowledgements.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-orange-600" size={24}/>
          <h3 className="font-semibold">Response SLA</h3>
          <p className="mt-2 text-gray-500">
            Monitor email response times.
          </p>
        </div>

      </div>

    </div>
  );

}
