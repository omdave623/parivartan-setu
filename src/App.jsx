import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [role, setRole] = useState(() => {
  return localStorage.getItem("kabadiwala_role") || "Collector";
});

const [loggedIn, setLoggedIn] = useState(() => {
  return localStorage.getItem("kabadiwala_loggedIn") === "true";
});
  const [page, setPage] = useState("dashboard");

 const defaultRequests = [
  {
    id: "EW-001",
    item: "Old Laptop",
    location: "Ahmedabad",
    weight: "4.5 kg",
    collector: "Rajesh Kumar",
    recycler: "GreenCycle",
    status: "Pending",
    expectedPrice: 900,
    offeredPrice: null,
    images: [],
    rejectionReason: "",
  },
  {
    id: "EW-002",
    item: "Mobile Phones",
    location: "Ahmedabad",
    weight: "2.2 kg",
    collector: "Amit Patel",
    recycler: "EcoTech",
    status: "Processing",
    expectedPrice: 450,
    offeredPrice: 425,
    images: [],
    rejectionReason: "",
  },
  {
    id: "EW-003",
    item: "Desktop Computer",
    location: "Ahmedabad",
    weight: "8.7 kg",
    collector: "Suresh Shah",
    recycler: "GreenCycle",
    status: "Recycled",
    expectedPrice: 1800,
    offeredPrice: 1750,
    images: [],
    rejectionReason: "",
  },
];

const [requests, setRequests] = useState(() => {
  const savedRequests =
    localStorage.getItem("kabadiwala_requests");

  return savedRequests
    ? JSON.parse(savedRequests)
    : defaultRequests;
});
useEffect(() => {
  localStorage.setItem(
    "kabadiwala_requests",
    JSON.stringify(requests)
  );
}, [requests]);
  const [form, setForm] = useState({
    item: "Laptop",
    weight: "",
    location: "",
    source: "",
    expectedPrice: "",
    notes: "",
    images: [],
  });

  const updateStatus = (id, status) => {
    setRequests((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, status }
          : item
      )
    );
  };

  const updateOfferPrice = (id, price) => {
    setRequests((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, offeredPrice: price }
          : item
      )
    );
  };

  const rejectRequest = (id, reason) => {
    setRequests((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "Rejected",
              rejectionReason: reason,
            }
          : item
      )
    );
  };

  const logout = () => {
  localStorage.removeItem(
    "kabadiwala_loggedIn"
  );

  localStorage.removeItem(
    "kabadiwala_role"
  );

  setLoggedIn(false);
  setRole("Collector");
  setPage("dashboard");
};
  const handleChange = (e) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  /* ================= IMAGE UPLOAD ================= */

  const handleImageChange = (e) => {
    const files = Array.from(
      e.target.files || []
    );

    if (files.length === 0) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
    ];

    const invalidFiles = files.filter(
      (file) =>
        !allowedTypes.includes(file.type)
    );

    if (invalidFiles.length > 0) {
      alert(
        "Only JPG, JPEG and PNG images are allowed."
      );
    }

    const validTypeFiles = files.filter(
      (file) =>
        allowedTypes.includes(file.type)
    );

    const oversizedFiles =
      validTypeFiles.filter(
        (file) =>
          file.size > 5 * 1024 * 1024
      );

    if (oversizedFiles.length > 0) {
      alert(
        "Each image must be less than 5 MB."
      );
    }

    const validFiles = validTypeFiles.filter(
      (file) =>
        file.size <= 5 * 1024 * 1024
    );

    if (validFiles.length === 0) {
      e.target.value = "";
      return;
    }

    const readers = validFiles.map(
      (file) =>
        new Promise((resolve) => {
          const reader = new FileReader();

          reader.onload = () => {
            resolve(reader.result);
          };

          reader.readAsDataURL(file);
        })
    );

    Promise.all(readers).then(
      (imageData) => {
        setForm((current) => ({
          ...current,
          images: [
            ...current.images,
            ...imageData,
          ],
        }));
      }
    );

    e.target.value = "";
  };

  const removeImage = (indexToRemove) => {
    setForm((current) => ({
      ...current,
      images: current.images.filter(
        (_, index) =>
          index !== indexToRemove
      ),
    }));
  };

  /* ================= ADD COLLECTION ================= */

  const addCollection = (e) => {
    e.preventDefault();

    if (
      !form.weight ||
      !form.location ||
      !form.source ||
      !form.expectedPrice
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    const newCollection = {
      id: `EW-${String(
        requests.length + 1
      ).padStart(3, "0")}`,

      item: form.item,

      location: form.location,

      weight: `${form.weight} kg`,

      expectedPrice: Number(form.expectedPrice),

      offeredPrice: null,

      collector: "Current Collector",

      recycler: "Pending Assignment",

      status: "Pending",

      images: form.images,

      source: form.source,

      notes: form.notes,

      rejectionReason: "",
    };

    setRequests((current) => [
      newCollection,
      ...current,
    ]);

    setForm({
      item: "Laptop",
      weight: "",
      location: "",
      source: "",
      expectedPrice: "",
      notes: "",
      images: [],
    });

    setPage("collections");
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  if (!loggedIn) {
    return (
      <div className="login-page">
        <div className="login-card">

          <div className="login-logo">
            ♻
          </div>

          <h1>
           Parivartan Setu
          </h1>

          <p className="login-subtitle">
            Connecting informal collectors
            with formal recyclers
          </p>

          <div className="role-switch">
            {[
              "Collector",
              "Recycler",
              "Admin",
            ].map((item) => (
             <button
  key={item}
  type="button"
  className={
    role === item
      ? "role active"
      : "role"
  }
  onClick={() => setRole(item)}
>
  {item}
</button>
            ))}
          </div>

          <div className="form-group">
            <label>Email</label>

            <input
              type="email"
              className="input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              className="input"
              placeholder="Enter your password"
            />
          </div>

          <button
            className="primary-btn login-submit"
            onClick={() =>
              setLoggedIn(true)
            }
          >
            Login as {role}
          </button>

          <p className="prototype-text">
            Prototype Mode • No real authentication
          </p>

        </div>
      </div>
    );
  }

  /* =====================================================
     COLLECTOR - COLLECTIONS
     ===================================================== */

  if (
    role === "Collector" &&
    page === "collections"
  ) {
    return (
      <Layout
        role={role}
        page={page}
        setPage={setPage}
        logout={logout}
      >

        <PageHeader
          title="Collections"
          subtitle="Manage your e-waste collection requests"
          role={role}
        />

        <div className="content-card">

          <div className="section-header">

            <div>
              <h2>
                Collection Requests
              </h2>

              <p>
                Manage incoming e-waste requests
              </p>
            </div>

            <button
              className="primary-btn"
              onClick={() =>
                setPage("add-collection")
              }
            >
              + Add Collection
            </button>

          </div>

          <div className="request-list">

            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                role={role}
                updateStatus={updateStatus}
                rejectRequest={rejectRequest}
                updateOfferPrice={updateOfferPrice}
              />
            ))}

          </div>

        </div>

      </Layout>
    );
  }

  /* =====================================================
     COLLECTOR - ADD COLLECTION
     ===================================================== */

  if (
    role === "Collector" &&
    page === "add-collection"
  ) {
    return (
      <Layout
        role={role}
        page={page}
        setPage={setPage}
        logout={logout}
      >

        <PageHeader
          title="Add Collection"
          subtitle="Record a new e-waste collection"
          role={role}
        />

        <div className="content-card form-card">

          <h2>
            Collection Details
          </h2>

          <p className="card-subtitle">
            Enter the details of the collected
            e-waste.
          </p>

          <form onSubmit={addCollection}>

            <div className="form-grid">

              <div className="form-group">

                <label>
                  E-waste Type *
                </label>

                <select
                  name="item"
                  value={form.item}
                  onChange={handleChange}
                  className="input"
                >
                  <option>Laptop</option>
                  <option>
                    Mobile Phones
                  </option>
                  <option>
                    Desktop Computer
                  </option>
                  <option>
                    Television
                  </option>
                  <option>
                    Other
                  </option>
                </select>

              </div>

              <div className="form-group">

                <label>
                  Weight (kg) *
                </label>

                <input
                  type="number"
                  step="0.1"
                  min="0"
                  name="weight"
                  value={form.weight}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. 4.5"
                />

              </div>

              <div className="form-group">

                <label>
                  Location *
                </label>

                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. Ahmedabad"
                />

              </div>

              <div className="form-group">

                <label>
                  Collection Source *
                </label>

                <input
                  type="text"
                  name="source"
                  value={form.source}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. Local scrap dealer"
                />

              </div>

              <div className="form-group">

                <label>
                  Expected Price (₹) *
                </label>

                <input
                  type="number"
                  step="1"
                  min="0"
                  name="expectedPrice"
                  value={form.expectedPrice}
                  onChange={handleChange}
                  className="input"
                  placeholder="e.g. 900"
                />

              </div>

            </div>

            <div className="form-group">

              <label>
                Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="input textarea"
                placeholder="Additional information about the material..."
                rows="4"
              />

            </div>

            {/* ================= IMAGES ================= */}

            <div className="form-group">

              <label>
                Material Images
              </label>

              <input
                type="file"
                accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                multiple
                onChange={handleImageChange}
                className="input image-input"
              />

              <p className="upload-hint">
                Upload one or more clear photos
                of the e-waste material.
                JPG, JPEG or PNG only.
                Maximum 5 MB per image.
              </p>

              {form.images.length > 0 && (
                <div className="image-preview-grid">

                  {form.images.map(
                    (image, index) => (
                      <div
                        className="image-preview-item"
                        key={index}
                      >

                        <img
                          src={image}
                          alt={`E-waste material ${
                            index + 1
                          }`}
                        />

                        <button
                          type="button"
                          className="remove-image-btn"
                          onClick={() =>
                            removeImage(index)
                          }
                        >
                          Remove
                        </button>

                      </div>
                    )
                  )}

                </div>
              )}

            </div>

            <div className="form-actions">

              <button
                type="button"
                className="secondary-btn"
                onClick={() =>
                  setPage("collections")
                }
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-btn"
              >
                Add Collection
              </button>

            </div>

          </form>

        </div>

      </Layout>
    );
  }

  /* =====================================================
     RECYCLER - E-WASTE
     ===================================================== */

  if (
    role === "Recycler" &&
    page === "ewaste"
  ) {
    return (
      <Layout
        role={role}
        page={page}
        setPage={setPage}
        logout={logout}
      >

        <PageHeader
          title="E-waste"
          subtitle="Verify and receive collected e-waste"
          role={role}
        />

        <div className="content-card">

          <div className="section-header">

            <div>
              <h2>
                Incoming E-waste
              </h2>

              <p>
                Verify collected material before
                processing.
              </p>
            </div>

          </div>

          <div className="request-list">

            {requests
              .filter(
                (request) =>
                  request.status ===
                    "Pending" ||
                  request.status ===
                    "Accepted"
              )
              .map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  role={role}
                  updateStatus={updateStatus}
                  rejectRequest={rejectRequest}
                  updateOfferPrice={updateOfferPrice}
                />
              ))}

          </div>

          {requests.filter(
            (request) =>
              request.status ===
                "Pending" ||
              request.status ===
                "Accepted"
          ).length === 0 && (
            <EmptyState
              title="No Incoming E-waste"
              message="There are no pending collection requests right now."
            />
          )}

        </div>

      </Layout>
    );
  }

  /* =====================================================
     RECYCLER - PROCESSING
     ===================================================== */

  if (
    role === "Recycler" &&
    page === "processing"
  ) {
    return (
      <Layout
        role={role}
        page={page}
        setPage={setPage}
        logout={logout}
      >

        <PageHeader
          title="Processing"
          subtitle="Manage e-waste recycling operations"
          role={role}
        />

        <div className="content-card">

          <div className="section-header">

            <div>
              <h2>
                Processing Records
              </h2>

              <p>
                Track material through recycling.
              </p>
            </div>

          </div>

          <div className="request-list">

            {requests
              .filter(
                (request) =>
                  request.status ===
                    "Received" ||
                  request.status ===
                    "Processing" ||
                  request.status ===
                    "Recycled"
              )
              .map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  role={role}
                  updateStatus={updateStatus}
                  rejectRequest={rejectRequest}
                  updateOfferPrice={updateOfferPrice}
                />
              ))}

          </div>

          {requests.filter(
            (request) =>
              request.status ===
                "Received" ||
              request.status ===
                "Processing" ||
              request.status ===
                "Recycled"
          ).length === 0 && (
            <EmptyState
              title="No Processing Records"
              message="No e-waste is currently in the processing pipeline."
            />
          )}

        </div>

      </Layout>
    );
  }

  /* =====================================================
     ADMIN - TRACKING
     ===================================================== */

  if (
    role === "Admin" &&
    page === "tracking"
  ) {
    return (
      <Layout
        role={role}
        page={page}
        setPage={setPage}
        logout={logout}
      >

        <PageHeader
          title="E-waste Tracking"
          subtitle="Track material from collection to recycling"
          role={role}
        />

        <div className="content-card">

          <div className="section-header">

            <div>
              <h2>
                Recycling Journey
              </h2>

              <p>
                Complete e-waste lifecycle.
              </p>
            </div>

          </div>

          <div className="tracking-list">

            {requests.map((request) => (
              <div
                className="tracking-card"
                key={request.id}
              >

                <div className="tracking-header">

                  <div>
                    <h3>
                      {request.item}
                    </h3>

                    <span>
                      {request.id}
                    </span>
                  </div>

                  <StatusBadge
                    status={request.status}
                  />

                </div>

                {request.images &&
                  request.images.length > 0 && (
                    <div className="request-images">

                      {request.images.map(
                        (image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${request.item} ${
                              index + 1
                            }`}
                            className="request-image"
                          />
                        )
                      )}

                    </div>
                  )}

                {request.status ===
                  "Rejected" && (
                  <div className="rejection-box">
                    <strong>
                      Rejection Reason:
                    </strong>{" "}
                    {request.rejectionReason}
                  </div>
                )}

                <div className="tracking-flow">

                  <TrackingStep
                    icon="📦"
                    title="Collected"
                    subtitle="Collector"
                  />

                  <div className="arrow">
                    →
                  </div>

                  <TrackingStep
                    icon="🚚"
                    title="Transported"
                    subtitle="In Transit"
                  />

                  <div className="arrow">
                    →
                  </div>

                  <TrackingStep
                    icon="🏭"
                    title="Received"
                    subtitle="Recycler"
                  />

                  <div className="arrow">
                    →
                  </div>

                  <TrackingStep
                    icon="⚙"
                    title="Processing"
                    subtitle="Recycling Plant"
                  />

                  <div className="arrow">
                    →
                  </div>

                  <TrackingStep
                    icon="♻"
                    title="Recycled"
                    subtitle="Completed"
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

      </Layout>
    );
  }

  /* =====================================================
     ADMIN DASHBOARD
     ===================================================== */

  if (role === "Admin") {

    const totalWeight =
      requests.reduce(
        (total, item) =>
          total +
          (parseFloat(item.weight) || 0),
        0
      );

    const pending =
      requests.filter(
        (item) =>
          item.status === "Pending"
      ).length;

    const processing =
      requests.filter(
        (item) =>
          item.status === "Processing"
      ).length;

    const recycled =
      requests.filter(
        (item) =>
          item.status === "Recycled"
      ).length;

    const rejected =
      requests.filter(
        (item) =>
          item.status === "Rejected"
      ).length;

    return (
      <Layout
        role={role}
        page={page}
        setPage={setPage}
        logout={logout}
      >

        <PageHeader
          title="Admin Dashboard"
          subtitle="Monitor the complete recycling ecosystem"
          role={role}
        />

        <div className="stats">

          <StatCard
            number={requests.length}
            label="Total E-waste Records"
          />

          <StatCard
            number={pending}
            label="Pending"
          />

          <StatCard
            number={processing}
            label="Processing"
          />

          <StatCard
            number={recycled}
            label="Recycled"
          />

          <StatCard
            number={rejected}
            label="Rejected"
          />

        </div>

        <div className="content-card">

          <div className="section-header">

            <div>
              <h2>
                Collection Overview
              </h2>

              <p>
                Total tracked weight:{" "}
                <strong>
                  {totalWeight.toFixed(1)} kg
                </strong>
              </p>
            </div>

            <button
              className="secondary-btn"
              onClick={() =>
                setPage("tracking")
              }
            >
              View Tracking
            </button>

          </div>

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Collector</th>
                <th>Weight</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>

              {requests.map((request) => (
                <tr key={request.id}>

                  <td>
                    {request.id}
                  </td>

                  <td>
                    {request.item}
                  </td>

                  <td>
                    {request.collector}
                  </td>

                  <td>
                    {request.weight}
                  </td>

                  <td>
                    <StatusBadge
                      status={request.status}
                    />
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </Layout>
    );
  }

  /* =====================================================
     NORMAL DASHBOARD
     ===================================================== */

  return (
    <Layout
      role={role}
      page="dashboard"
      setPage={setPage}
      logout={logout}
    >

      <PageHeader
        title="Dashboard"
        subtitle={`Welcome back, ${role}`}
        role={role}
      />

      <div className="stats">

        <StatCard
          number={requests.length}
          label="Total Requests"
        />

        <StatCard
          number={
            requests.filter(
              (item) =>
                item.status ===
                "Recycled"
            ).length
          }
          label="Completed"
        />

        <StatCard
          number={
            requests
              .reduce(
                (total, item) =>
                  total +
                  (parseFloat(
                    item.weight
                  ) || 0),
                0
              )
              .toFixed(1) + " kg"
          }
          label="E-waste Tracked"
        />

      </div>

      <div className="content-card">

        <div className="section-header">

          <div>
            <h2>
              Recent Activity
            </h2>

            <p>
              Latest e-waste records
            </p>
          </div>

        </div>

        <table>

          <thead>
            <tr>
              <th>ID</th>
              <th>Item</th>
              <th>Location</th>
              <th>Weight</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {requests.map((request) => (
              <tr key={request.id}>

                <td>
                  {request.id}
                </td>

                <td>
                  {request.item}
                </td>

                <td>
                  {request.location}
                </td>

                <td>
                  {request.weight}
                </td>

                <td>
                  <StatusBadge
                    status={request.status}
                  />
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}


/* =====================================================
   LAYOUT
   ===================================================== */

function Layout({
  role,
  page,
  setPage,
  logout,
  children,
}) {
  return (
    <div className="dashboard">

      <aside className="sidebar">

        <div className="brand">

          <span>
            ♻
          </span>

          <div>
            <strong>
              Parivartan
            </strong>

            <small>
              Setu
            </small>
          </div>

        </div>

        <nav className="menu-list">

          <button
            className={
              page === "dashboard"
                ? "nav-item active"
                : "nav-item"
            }
            onClick={() =>
              setPage("dashboard")
            }
          >
            <span>⌂</span>
            Dashboard
          </button>

          {role === "Collector" && (
            <>
              <button
                className={
                  page === "collections"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  setPage("collections")
                }
              >
                <span>📦</span>
                Collections
              </button>

              <button
                className={
                  page === "add-collection"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  setPage("add-collection")
                }
              >
                <span>＋</span>
                Add Collection
              </button>
            </>
          )}

          {role === "Recycler" && (
            <>
              <button
                className={
                  page === "ewaste"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  setPage("ewaste")
                }
              >
                <span>♻</span>
                E-waste
              </button>

              <button
                className={
                  page === "processing"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  setPage("processing")
                }
              >
                <span>⚙</span>
                Processing
              </button>
            </>
          )}

          {role === "Admin" && (
            <>
              <button
                className="nav-item"
                type="button"
              >
                <span>👥</span>
                Collectors
              </button>

              <button
                className="nav-item"
                type="button"
              >
                <span>🏭</span>
                Recyclers
              </button>

              <button
                className={
                  page === "tracking"
                    ? "nav-item active"
                    : "nav-item"
                }
                onClick={() =>
                  setPage("tracking")
                }
              >
                <span>🔎</span>
                E-waste Tracking
              </button>

              <button
                className="nav-item"
                type="button"
              >
                <span>📊</span>
                Analytics
              </button>
            </>
          )}

          <button
            className="nav-item"
            type="button"
          >
            <span>🕘</span>
            History
          </button>

          <button
            className="nav-item"
            type="button"
          >
            <span>👤</span>
            Profile
          </button>

        </nav>

        <button
          className="logout-btn"
          onClick={logout}
        >
          <span>↪</span>
          Logout
        </button>

      </aside>

      <main className="main-content">
        {children}
      </main>

    </div>
  );
}


/* =====================================================
   PAGE HEADER
   ===================================================== */

function PageHeader({
  title,
  subtitle,
  role,
}) {
  return (
    <div className="topbar">

      <div>

        <h1>
          {title}
        </h1>

        <p>
          {subtitle}
        </p>

      </div>

      <div className="user-badge">

        <div className="avatar">
          {role.charAt(0)}
        </div>

        <div>

          <strong>
            {role}
          </strong>

          <small>
            Prototype Account
          </small>

        </div>

      </div>

    </div>
  );
}


/* =====================================================
   STAT CARD
   ===================================================== */

function StatCard({
  number,
  label,
}) {
  return (
    <div className="stat-card">

      <div className="stat-number">
        {number}
      </div>

      <div className="stat-label">
        {label}
      </div>

    </div>
  );
}


/* =====================================================
   STATUS BADGE
   ===================================================== */

function StatusBadge({
  status,
}) {
  let className =
    "status pending";

  if (status === "Recycled") {
    className =
      "status completed";
  }

  if (
    status === "Processing" ||
    status === "Received"
  ) {
    className =
      "status processing";
  }

  if (status === "Accepted") {
    className =
      "status accepted";
  }

  if (status === "Rejected") {
    className =
      "status rejected";
  }

  return (
    <span className={className}>
      {status}
    </span>
  );
}


/* =====================================================
   REQUEST CARD
   ===================================================== */

function RequestCard({
  request,
  role,
  updateStatus,
  rejectRequest,
  updateOfferPrice,
}) {
  const [offerPrice, setOfferPrice] = useState(
    request.offeredPrice ?? ""
  );

  const handleReject = () => {

    const reason = window.prompt(
      "Why are you rejecting this e-waste request?\n\nExample: Material does not match / Damaged / Unsafe / Weight mismatch"
    );

    if (
      reason === null ||
      reason.trim() === ""
    ) {
      return;
    }

    rejectRequest(
      request.id,
      reason.trim()
    );
  };

  return (
    <div className="request-card">

      <div className="request-info">

        <div className="request-title">

          <h3>
            {request.item}
          </h3>

          <span>
            {request.id}
          </span>

        </div>

        {request.images &&
          request.images.length > 0 && (
            <div className="request-images">

              {request.images.map(
                (image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${request.item} ${
                      index + 1
                    }`}
                    className="request-image"
                  />
                )
              )}

            </div>
          )}

        <div className="request-details">

          <span>
            📍 {request.location}
          </span>

          <span>
            ⚖ {request.weight}
          </span>

          <span>
            👤 {request.collector}
          </span>

        </div>

        <p className="recycler-name">
          Recycler:{" "}
          {request.recycler}
        </p>

        <div className="price-info">
          <span>💰 Expected Price: <strong>₹{Number(request.expectedPrice || 0).toLocaleString("en-IN")}</strong></span>
          <span>🤝 Recycler Offer: <strong>{request.offeredPrice ? `₹${Number(request.offeredPrice).toLocaleString("en-IN")}` : "Pending"}</strong></span>
        </div>

        {request.status ===
          "Rejected" && (
          <div className="rejection-box">
            <strong>
              Rejection Reason:
            </strong>{" "}
            {request.rejectionReason}
          </div>
        )}

      </div>

      <div className="request-actions">

        <StatusBadge
          status={request.status}
        />

        {/* COLLECTOR */}

        {role === "Collector" &&
          request.status === "Accepted" && (
            <button
              className="secondary-btn small"
              type="button"
            >
              ✓ Offer Accepted
            </button>
          )}

        {/* RECYCLER */}

        {role === "Recycler" &&
          request.status === "Pending" && (
            <div className="recycler-actions price-actions">
              <input
                type="number"
                min="0"
                step="1"
                className="input price-input"
                placeholder="Offer price ₹"
                value={offerPrice}
                onChange={(e) => {
                  setOfferPrice(e.target.value);
                  updateOfferPrice(
                    request.id,
                    e.target.value === "" ? null : Number(e.target.value)
                  );
                }}
              />

              <button
                className="primary-btn small"
                onClick={() => {
                  const numericOffer = Number(offerPrice);
                  if (!offerPrice || !Number.isFinite(numericOffer) || numericOffer < 0) {
                    alert("Please enter a valid offer price.");
                    return;
                  }
                  updateOfferPrice(request.id, numericOffer);
                  updateStatus(request.id, "Accepted");
                }}
              >
                Accept Request
              </button>

              <button
                className="reject-btn small"
                onClick={handleReject}
              >
                ✕ Reject
              </button>
            </div>
          )}

        {role === "Recycler" &&
          request.status === "Accepted" && (
            <div className="recycler-actions">
              <button
                className="primary-btn small"
                onClick={() =>
                  updateStatus(
                    request.id,
                    "Received"
                  )
                }
              >
                ✓ Verify & Receive
              </button>

              <button
                className="reject-btn small"
                onClick={handleReject}
              >
                ✕ Reject
              </button>
            </div>
          )}

        {role === "Recycler" &&
          request.status ===
            "Received" && (
            <button
              className="primary-btn small"
              onClick={() =>
                updateStatus(
                  request.id,
                  "Processing"
                )
              }
            >
              ⚙ Start Processing
            </button>
          )}

        {role === "Recycler" &&
          request.status ===
            "Processing" && (
            <button
              className="primary-btn small"
              onClick={() =>
                updateStatus(
                  request.id,
                  "Recycled"
                )
              }
            >
              ♻ Mark Recycled
            </button>
          )}

        {role === "Recycler" &&
          request.status ===
            "Recycled" && (
            <button
              className="secondary-btn small"
              type="button"
            >
              ✓ Completed
            </button>
          )}

        {role === "Recycler" &&
          request.status ===
            "Rejected" && (
            <button
              className="secondary-btn small"
              type="button"
            >
              ✕ Rejected
            </button>
          )}

      </div>

    </div>
  );
}


/* =====================================================
   TRACKING STEP
   ===================================================== */

function TrackingStep({
  icon,
  title,
  subtitle,
}) {
  return (
    <div className="tracking-step">

      <div className="tracking-icon">
        {icon}
      </div>

      <strong>
        {title}
      </strong>

      <span>
        {subtitle}
      </span>

    </div>
  );
}


/* =====================================================
   EMPTY STATE
   ===================================================== */

function EmptyState({
  title,
  message,
}) {
  return (
    <div className="empty-state">

      <div className="empty-icon">
        📦
      </div>

      <h3>
        {title}
      </h3>

      <p>
        {message}
      </p>

    </div>
  );
}


export default App;