import streamlit as st
import psutil
import socket
import pandas as pd
import docker

st.set_page_config(layout="wide", page_title="Home Lab Control Center")
st.title("🛠️ Home Lab Control Center")

tab1, tab2, tab3, tab4 = st.tabs(["📊 Resources", "🐳 Containers", "🌐 Network", "📄 Portfolio"])

with tab1:
    st.subheader("Server Resource Usage")
    cpu_pct = psutil.cpu_percent(interval=1)
    mem = psutil.virtual_memory()
    disk = psutil.disk_usage('/')
    
    col1, col2, col3 = st.columns(3)
    col1.metric("CPU Usage", f"{cpu_pct}%")
    col2.metric("Memory Used", f"{mem.percent}%", f"{mem.used // (1024**2)} MB")
    col3.metric("Disk Usage", f"{disk.percent}%", f"{disk.free // (1024**3)} GB free")

with tab2:
    st.subheader("Docker Containers")
    try:
        client = docker.from_env()
        containers = client.containers.list(all=True)
        rows = []
        for c in containers:
            rows.append({
                "Name": c.name,
                "Image": c.image.tags[0] if c.image.tags else "custom",
                "Status": c.status,
                "Ports": str(c.ports)
            })
        if rows:
            st.dataframe(pd.DataFrame(rows), hide_index=True, use_container_width=True)
        else:
            st.info("No containers found.")
    except Exception as e:
        st.error(f"Could not load containers: {e}")

with tab3:
    st.subheader("Local Subnet Scanner")
    base_ip = st.text_input("Subnet Base (e.g., 192.168.1.)", "192.168.1.")
    if st.button("Scan Active IPs"):
        active_hosts = []
        with st.spinner("Scanning local network..."):
            for i in range(1, 255):
                ip = f"{base_ip}{i}"
                sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
                sock.settimeout(0.02)
                result = sock.connect_ex((ip, 22))
                if result == 0:
                    active_hosts.append({"IP Address": ip, "Status": "Active (Port 22)"})
                sock.close()
        if active_hosts:
            st.dataframe(pd.DataFrame(active_hosts), hide_index=True)
        else:
            st.info("No active hosts found.")

with tab4:
    st.subheader("Cloud Engineer Portfolio")
    st.markdown("""
    ### John Williams
    * **Focus:** Cloud Engineering, Linux Administration, & Containerization
    * **Core Skills:** Docker, Ubuntu Server, Networking, Python.
    """)
