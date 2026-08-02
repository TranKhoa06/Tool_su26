window.loadAdminData = async function() {
    if (!window.isAdmin) return;
    document.getElementById('admin-content').classList.remove('hidden');
    document.getElementById('admin-login-prompt').classList.add('hidden');
    
    const tbody = document.getElementById('users-table-body');
    tbody.innerHTML = '<tr><td colspan="4">Đang tải dữ liệu...</td></tr>';
    
    try {
        const usersSnap = await window.getDocs(window.collection(window.db, "users"));
        tbody.innerHTML = '';
        
        usersSnap.forEach(doc => {
            const data = doc.data();
            const perms = data.permissions || ['dic201'];
            
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <img src="${data.avatar}" class="user-avatar-small" alt="avatar">
                    <strong>${data.name}</strong>
                </td>
                <td>${data.email}</td>
                <td>
                    <div class="checkbox-container">
                        <label><input type="checkbox" id="perm-dic201-${data.uid}" value="dic201" ${perms.includes('dic201') ? 'checked' : ''} disabled> DIC201 (Mặc định)</label>
                        <label><input type="checkbox" id="perm-mcp201-${data.uid}" value="mcp201" ${perms.includes('mcp201') ? 'checked' : ''}> MCP201</label>
                        <label><input type="checkbox" id="perm-csd202-${data.uid}" value="csd202" ${perms.includes('csd202') ? 'checked' : ''}> CSD202</label>
                    </div>
                </td>
                <td>
                    <button class="btn-inline" onclick="savePermissions('${data.uid}')">Lưu Quyền</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
        
    } catch(e) {
        tbody.innerHTML = `<tr><td colspan="4" style="color:red">Lỗi tải dữ liệu: ${e.message}</td></tr>`;
    }
};

window.savePermissions = async function(uid) {
    const isMcp201 = document.getElementById(`perm-mcp201-${uid}`).checked;
    const isCsd202 = document.getElementById(`perm-csd202-${uid}`).checked;
    
    const newPerms = ['dic201'];
    if(isMcp201) newPerms.push('mcp201');
    if(isCsd202) newPerms.push('csd202');
    
    try {
        const userRef = window.doc(window.db, "users", uid);
        await window.updateDoc(userRef, {
            permissions: newPerms
        });
        alert('Cập nhật quyền thành công!');
    } catch(e) {
        alert('Lỗi cập nhật: ' + e.message);
    }
};
