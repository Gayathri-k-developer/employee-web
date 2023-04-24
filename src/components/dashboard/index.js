import {
  Box,
  Card,
  CardContent,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../network/api";

const Dashboard = ({ projects, tasks, users }) => {
  return (
    <Box>
      <>
        <Title title="PROJECTS" />
        <ProjectsGrid projects={projects} />
      </>
      <>
        <Title title="TASKS" />
        <TasksGrid tasks={tasks} />
      </>
      <>
        <Title title="USERS" />
        <UserTable users={users} />
      </>
    </Box>
  );
};

export default Dashboard;

const Title = ({ title }) => (
  <div className="md:flex justify-center px-5 items-center">
    <div>
      <Typography
        style={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bolder",
          fontSize: 30,
        }}
        py={1}
      >
        {title}
      </Typography>
    </div>
  </div>
);

const Content = ({ onClick = () => null, title = "Total", count }) => (
  <Box px={2}>
    <Card sx={{ maxWidth: 355 }}>
      <div className=" border-2  h-28">
        <CardContent onClick={onClick} style={{ cursor: "pointer" }}>
          <div className="bg-white pl-2 rounded-sm ">
            <div className="text-secondary-main ">
              <Typography variant="h5" component="div">
                {title}
              </Typography>
            </div>
            <div className="text-secondary-main p-2 text-center">
              <Typography color="text.primary" variant="h5">
                {count}
              </Typography>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  </Box>
);

const ProjectsGrid = ({ projects = [] }) => {
  const navigate = useNavigate();
  const total = projects?.length;
  const completed = projects?.filter((project) => project?.isCompleted)?.length;
  const progressing = total - completed;
  const handleProjectClick = () => {
    navigate(`/projects`);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <Content count={total} onClick={handleProjectClick} />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="In Progress"
          count={progressing}
          onClick={handleProjectClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="Completed"
          count={completed}
          onClick={handleProjectClick}
        />
      </Grid>
    </Grid>
  );
};

const TasksGrid = ({ tasks = [] }) => {
  const navigate = useNavigate();
  const total = tasks?.length;
  const completed = tasks?.filter(
    (project) => project?.status === "Completed"
  )?.length;
  const progressing = total - completed;
  const handleProjectClick = () => {
    navigate(`/tasks`);
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} lg={4}>
        <Content count={total} onClick={handleProjectClick} />
      </Grid>

      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="In Progress"
          count={progressing}
          onClick={handleProjectClick}
        />
      </Grid>
      <Grid item xs={12} sm={6} lg={4}>
        <Content
          title="Completed"
          count={completed}
          onClick={handleProjectClick}
        />
      </Grid>
    </Grid>
  );
};

const UserTable = ({ users = [] }) => {
  const [userData, setUserData] = useState();
  const [open, setOpen] = useState(false);
  const handleClick = async (id) => {
    const res = await get(`/dashboard/${id}`);
    if (res?.success) setUserData(res?.result);
    setOpen(true);
  };

  console.log("userData : ", userData);
  return (
    <div className="p-2">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Assignee</TableCell>

              <TableCell>View</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users?.map((user, i) => (
              <TableRow key={i}>
                <TableCell>{user?.employeeId}</TableCell>
                <TableCell>{user?.fullName}</TableCell>

                <TableCell>
                  <button
                    className="rounded-full bg-slate-200 "
                    onClick={() => handleClick(user?.id)}
                  >
                    <svg viewBox="0 0 512 282.68" className="w-5 h-5 ">
                      <path
                        fillRule="nonzero"
                        d="M3.14 132.9c14.51-17.53 29.53-33.35 44.94-47.39 60.17-54.78 127.69-84 197.43-85.45 69.61-1.46 141.02 24.79 209.14 80.95 18.45 15.21 36.6 32.54 54.3 52 3.82 4.19 4.02 10.42.78 14.81-19.73 27.91-41.98 51.4-65.97 70.56-53.57 42.77-115.96 63.9-179.2 64.29-63.05.39-126.84-19.87-183.44-59.83-28.31-20-54.85-44.93-78.58-74.67-3.65-4.59-3.29-11.1.6-15.27zM256 83.24c32.09 0 58.1 26.01 58.1 58.1s-26.01 58.1-58.1 58.1-58.1-26.01-58.1-58.1c0-5.97.9-11.74 2.57-17.16 4.25 11.15 15.04 19.07 27.68 19.07 16.35 0 29.61-13.26 29.61-29.61 0-12.7-7.98-23.52-19.2-27.73 5.5-1.73 11.36-2.67 17.44-2.67zm107.24-33.52a141.453 141.453 0 0 1 23.1 37.7c6.92 16.67 10.74 34.9 10.74 53.92 0 19.03-3.82 37.26-10.73 53.94a141.479 141.479 0 0 1-30.6 45.8l-1.92 1.89c26.4-9.83 51.79-24.09 75.37-42.91 20.12-16.07 38.96-35.49 55.99-58.27-15-15.93-30.16-30.18-45.38-42.73-25.22-20.8-50.84-37.2-76.57-49.34zm-212.08 185.9c-10.65-11.81-19.33-25.44-25.5-40.32a140.518 140.518 0 0 1-10.74-53.96c0-19.01 3.81-37.22 10.72-53.87 6.85-16.52 16.75-31.46 28.96-44.1-31.5 13.33-61.97 33.25-90.76 59.44-12.7 11.57-25.04 24.3-36.95 38.17 20.74 24.71 43.54 45.64 67.69 62.71 18.19 12.84 37.15 23.5 56.58 31.93zM300.95 32.58c-13.78-5.71-28.98-8.88-44.94-8.88-15.94 0-31.12 3.17-44.93 8.9-14.34 5.95-27.32 14.73-38.23 25.64-10.88 10.89-19.64 23.85-25.6 38.2-5.71 13.79-8.88 28.97-8.88 44.9 0 15.96 3.17 31.17 8.9 44.98a117.654 117.654 0 0 0 25.58 38.19c10.86 10.84 23.84 19.6 38.24 25.57 13.8 5.72 28.98 8.88 44.92 8.88 15.95 0 31.15-3.17 44.96-8.88 14.36-5.93 27.32-14.7 38.2-25.57 10.88-10.88 19.64-23.84 25.57-38.16 5.72-13.85 8.89-29.05 8.89-45.01 0-15.95-3.17-31.14-8.89-44.95-5.93-14.37-14.69-27.33-25.57-38.21-10.86-10.86-23.84-19.63-38.22-25.6z"
                      />
                    </svg>
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
