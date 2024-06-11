"use client";

import { useState, useEffect } from 'react';
import { Campaign, DateDetails } from '@/types';
import campaignService from '@/services/campaign.service';

export default function Page() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Campaign>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await campaignService.getCampaigns();
        console.log("API Response:", response);
        setCampaigns(response.data);
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };
    fetchCampaigns();
  }, []);

  const handleEdit = (index: number) => {
    const campaign = campaigns[index];
    if (campaign) {
      setEditIdx(index);
      setFormData(campaign);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, dateType: 'startDate' | 'endDate', field: keyof DateDetails) => {
    const { value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [dateType]: {
        ...prev[dateType],
        [field]: Number(value),
      }
    }));
  };

  const handleSave = () => {
    if (editIdx !== null) {
      const updatedCampaigns = [...campaigns];
      updatedCampaigns[editIdx] = formData as Campaign;
      setCampaigns(updatedCampaigns);
      setEditIdx(null);
    }
  };

  const handleCancel = () => {
    setEditIdx(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredCampaigns = Array.isArray(campaigns) ? campaigns.filter(campaign =>
    campaign.campaignName.toLowerCase().includes(searchTerm.toLowerCase())
  ) : [];

  return (
    <>
      <h1>Campaign Page</h1>
      <section className="container px-4 mx-auto">
        <div className="flex items-center justify-between mt-6 mb-4">
          <input
            type="text"
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={handleSearch}
            className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:outline-none focus:ring"
          />
        </div>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Campaign ID</th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Campaign Name</th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">University ID</th>
                    <th className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">University Name</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">StartDate</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">EndDate</th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">Status</th>
                    <th className="relative py-3.5 px-4"><span className="sr-only">Edit</span></th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {filteredCampaigns.map((campaign, index) => (
                    <tr key={campaign.campaignId}>
                      <td className="px-20 py-4 text-sm font-medium whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="campaignId"
                            value={formData.campaignId || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">{campaign.campaignId}</h2>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="campaignName"
                            value={formData.campaignName || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{campaign.campaignName}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-20 py-4 text-sm font-medium whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="universityId"
                            value={formData.universityId || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">{campaign.universityId}</h2>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="universityName"
                            value={formData.universityName || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{campaign.universityName}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">
                        {editIdx === index ? (
                          <>
                            <input
                              type="number"
                              name="startDateYear"
                              value={formData.startDate?.year || ''}
                              onChange={(e) => handleDateChange(e, 'startDate', 'year')}
                              placeholder="Year"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="startDateMonth"
                              value={formData.startDate?.month || ''}
                              onChange={(e) => handleDateChange(e, 'startDate', 'month')}
                              placeholder="Month"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="startDateDay"
                              value={formData.startDate?.day || ''}
                              onChange={(e) => handleDateChange(e, 'startDate', 'day')}
                              placeholder="Day"
                              className="text-gray-700 dark:text-gray-200"
                            />
                          </>
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{`${campaign.startDate?.year}-${campaign.startDate?.month}-${campaign.startDate?.day}`}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700 dark:text-gray-200">
                        {editIdx === index ? (
                          <>
                            <input
                              type="number"
                              name="endDateYear"
                              value={formData.endDate?.year || ''}
                              onChange={(e) => handleDateChange(e, 'endDate', 'year')}
                              placeholder="Year"
                              className="text-gray-700 dark
                            dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="endDateMonth"
                              value={formData.endDate?.month || ''}
                              onChange={(e) => handleDateChange(e, 'endDate', 'month')}
                              placeholder="Month"
                              className="text-gray-700 dark:text-gray-200"
                            />
                            <input
                              type="number"
                              name="endDateDay"
                              value={formData.endDate?.day || ''}
                              onChange={(e) => handleDateChange(e, 'endDate', 'day')}
                              placeholder="Day"
                              className="text-gray-700 dark:text-gray-200"
                            />
                          </>
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{`${campaign.endDate?.year}-${campaign.endDate?.month}-${campaign.endDate?.day}`}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <input
                            type="text"
                            name="status"
                            value={formData.status || ''}
                            onChange={handleChange}
                            className="text-gray-700 dark:text-gray-200"
                          />
                        ) : (
                          <div>
                            <h4 className="text-gray-700 dark:text-gray-200">{campaign.status}</h4>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        {editIdx === index ? (
                          <>
                            <button
                              onClick={handleSave}
                              className="text-green-600 hover:text-green-900"
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancel}
                              className="text-red-600 hover:text-red-900 ml-4"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleEdit(index)}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredCampaigns.length === 0 && (
                <div className="px-4 py-3 text-gray-500 dark:text-gray-200">
                  No campaigns found.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between mt-6">
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
            Previous
          </button>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
              1
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
              2
            </button>
            <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
              3
            </button>
          </div>
          <button className="px-4 py-2 text-sm text-gray-700 bg-white border rounded-md hover:bg-gray-100">
            Next
          </button>
        </div>

      </section>
    </>
  );
}
