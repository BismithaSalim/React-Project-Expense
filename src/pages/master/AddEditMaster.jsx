import React, { useEffect, useState } from "react";
import { TextField, Button, MenuItem, Stack } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { addMasterData, updateMasterData, getMasterDataById } from "../../services/api";

const AddEditMasterData = () => {
  const { id } = useParams(); // undefined for add
  const [form, setForm] = useState({ type: "Category", name: "" });
  const [types] = useState(["Category"]);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const res = await getMasterDataById(id);
        if (res.data.status === 100) {
          setForm({ type: res.data.data[0].type, name: res.data.data[0].name });
        } else {
          alert("Failed to load data");
        }
      };
      fetchData();
    }
  }, [id]);

  const handleSubmit = async () => {
    if (!form.type || !form.name) return alert("Please fill all fields");

    try {
      if (id) {
        await updateMasterData(id, form);
        alert("Updated successfully");
      } else {
        await addMasterData(form);
        alert("Added successfully");
      }
      navigate("/master-data");
    } catch (err) {
      console.error(err);
      alert("Error saving data");
    }
  };

  return (
    <Stack spacing={2} maxWidth={400} margin="auto" mt={4}>
      <TextField
        select
        label="Type"
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
      >
        {types.map((t) => (
          <MenuItem key={t} value={t}>
            {t}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        label="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <Button variant="contained" onClick={handleSubmit}>
        {id ? "Update" : "Add"}
      </Button>
    </Stack>
  );
};

export default AddEditMasterData;