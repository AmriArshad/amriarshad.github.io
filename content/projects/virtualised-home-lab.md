+++
title = "Windows Server and Active Directory Infrastructure Lab"
+++

**Project Objective:**

Designed, deployed, and managed a complete virtualized Active Directory environment to simulate real-world system administration tasks. Focused on practicing user, computer, and policy management within an isolated internal network.

---

## Project Scope

- **Environment Setup**
  - Configured KVM/QEMU virtualization stack with Virt-Manager on Linux.
  - Created isolated virtual networking (LabNet) for full VM-to-VM communication without external internet access.

- **Server Deployment**
  - Installed and configured Windows Server 2022 as a Domain Controller (DC01).
  - Promoted DC01 to manage the `lab.local` domain, including DNS and DHCP services.

- **Client Deployment**
  - Installed Windows 11 Pro (CL01) and successfully joined it to the `lab.local` domain.

- **Active Directory Management**
  - Structured Organizational Units (OUs) for Computers and Users (`Lab Computers` and `Lab Users`).
  - Created and managed domain user accounts and security groups.

- **Group Policy Management**
  - Deployed and managed Group Policy Objects (GPOs) to enforce environment controls:
    - Set custom desktop wallpaper via GPO.
    - Disabled Control Panel and Settings access for standard users.
    - Mapped network drives dynamically based on security group membership using Item-Level Targeting.
    - Enforced strong password policies at the domain level.

- **Security Group Access Control**
  - Implemented drive mapping restrictions based on group membership to simulate least-privilege access controls.
  - Tested access scenarios with both administrative and standard user accounts.

- **Troubleshooting and Validation**
  - Used `gpresult`, `rsop.msc`, and Group Policy Results Wizard to validate GPO applications.
  - Diagnosed and resolved common GPO application issues related to user/computer targeting and security filtering.

---

## Skills Practised

- Active Directory Domain Services (AD DS)
- DNS and DHCP configuration on Windows Server
- Group Policy Object (GPO) deployment and management
- Security group-based resource access control
- Windows Server and Windows 11 client management
- Troubleshooting GPO delivery and domain join issues
- Virtualization and isolated network lab environment management

---

## Outcome

Successfully simulated a professional-grade corporate environment.  
Demonstrated ability to deploy, configure, secure, and manage a functional Active Directory infrastructure and client devices, reflecting real-world System Administration and Infrastructure Support tasks.
