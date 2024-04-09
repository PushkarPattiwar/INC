import { Suspense, lazy } from 'react';
import { FormsBanner } from '../components';
import { useGetLabAllocations } from '../hooks/admin.hooks';

const Table = lazy(() => import('../components/table.jsx'))

function ProjectsLabAllocation() {
    const { data: conceptsData, isLoading: isConceptsLoading } = useGetLabAllocations('concepts')
    const { data: impetusData, isLoading: isImpetusLoading } = useGetLabAllocations('impetus')

    const columns = [
        {
            name: 'Project ID',
            selector: row => row['pid'],
            cellExport: row => row['pid'],
            width: '180px',
            sortable: true
        },
        {
            name: 'Project Title',
            selector: row => row['title'],
            cellExport: row => row['title'],
            width: '240px',
        },
        {
            name: 'Lab Assigned',
            selector: row => row['lab'],
            cellExport: row => row['lab'],
            width: '180px',
            sortable: true
        }
    ]

    return (
        <>
            <FormsBanner eventName='Project-To-Lab Allocations' eventDescription='Participants are requested to report and settle down to their allocated lab locations' />
            <h1 className='text-4xl text-center mt-6 text-gold font-bold'>Concepts</h1>
            {!isConceptsLoading ?
                <Suspense fallback={<div>Loading Allocations...</div>}>
                    <Table title={`Concepts Lab Allocations ${new Date().toISOString().split('T')[0]}`} columns={columns} loading={isConceptsLoading} data={conceptsData?.data} outerClassName='md:mx-auto mb-10 md:w-[50%] w-full' />
                </Suspense> :
                <div className='text-center text-2xl'>Loading Allocations...</div>
            }
            <hr className='border border-gold md:w-[70%] w-full m-auto' />
            <h1 className='text-4xl text-center mt-6 text-gold font-bold'>Impetus</h1>
            {!isImpetusLoading ?
                <Suspense fallback={<div>Loading Allocations...</div>}>
                    <Table title={`Impetus Lab Allocations ${new Date().toISOString().split('T')[0]}`} columns={columns} loading={isImpetusLoading} data={impetusData?.data} outerClassName='md:mx-auto mb-10 md:w-[50%] w-full' />
                </Suspense> :
                <div className='text-center text-2xl'>Loading Allocations...</div>
            }
        </>
    )
}

export default ProjectsLabAllocation;