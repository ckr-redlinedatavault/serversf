import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
    try {
        // Collect various event types to simulate an audit log
        const [interns, enrollments, tasks, reviews, contacts] = await Promise.all([
            prisma.internForm.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
            prisma.courseEnrollment.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
            prisma.task.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
            prisma.review.findMany({ take: 20, orderBy: { createdAt: 'desc' } }),
            prisma.contact.findMany({ take: 20, orderBy: { createdAt: 'desc' } })
        ]);

        const logs = [
            ...interns.map(i => ({ id: i.id, type: 'INTERN_APP', message: `New intern application from ${i.name}`, time: i.createdAt, status: 'info' })),
            ...enrollments.map(e => ({ id: e.id, type: 'PAYMENT', message: `Enrollment initiated for ${e.name} (Amount: ₹${e.amount})`, time: e.createdAt, status: e.status === 'verified' ? 'success' : 'pending' })),
            ...tasks.map(t => ({ id: t.id, type: 'OPERATION', message: `Task Broadcast: ${t.title}`, time: t.createdAt, status: t.status === 'completed' ? 'success' : 'info' })),
            ...reviews.map(r => ({ id: r.id, type: 'FEEDBACK', message: `New public review from ${r.userName}`, time: r.createdAt, status: 'info' })),
            ...contacts.map(c => ({ id: c.id, type: 'INBOUND', message: `Message from ${c.name} regarding: ${c.subject || 'No Subject'}`, time: c.createdAt, status: 'info' }))
        ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 50);

        return NextResponse.json({ success: true, logs });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Failed to fetch audit logs" }, { status: 500 });
    }
}
